const express = require("express");
const mongoose = require("mongoose");

const errorHandler = require("errorhandler");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const passport = require("passport");
const bodyParser = require("body-parser");

const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");

const path = require("path");
const multer = require("multer");

const upload = multer({ dest: path.join(__dirname, "saves") });

const dotenv = require("dotenv");

// Load the env settings & API keys (eventually)
dotenv.load({ path: ".env" });

// Controllers
const userController = require("./controllers/user");
const databaseController = require("./controllers/database");
const groupController = require("./controllers/group");

// Config
const config = require("./config/config");

// API keys and Passport configuration.
const passportConfig = require("./config/passport");

// Create express server
const app = express();

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", err => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
      clear_interval: 3600
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join("client", "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join("client", "build", "index.html"));
});

// Routes
app.post(
  "/register",
  [
    check("username")
      .exists()
      .withMessage("Username field cannot be blank."),

    check("password")
      .exists()
      .withMessage("Password field cannot be blank.")
      .isLength({ min: 5 })
      .withMessage("A password must be over 5 characters long."),

    check("confirmPassword", "Confirmed passwords do not match each other.")
      .exists()
      .custom((value, { req }) => value === req.body.password)
  ],
  userController.register
);

app.post(
  "/user/login",
  [
    check("username")
      .exists()
      .withMessage("Username field cannot be blank."),

    check("password")
      .exists()
      .withMessage("Password field cannot be blank.")
  ],
  userController.login
);

app.get("/user/info", (req, res) => {
  if (req.isAuthenticated()) {
    const user = {
      id: req.user.id,
      username: req.user.username,
      group: req.session.group || null
    };

    return res.json(user);
  }

  return res.sendStatus(403);
});

app.get("/user/logout", userController.logout);

app.get(
  "/database/list",
  passportConfig.isAuthenticated,
  databaseController.listDatabase
);

// Title is in the "get" as express doesn't deal with FormData,
// which is what the saved database binary will be sent as.
app.post(
  "/database/save/:title?",
  passportConfig.isAuthenticated,
  [
    check("title")
      .exists()
      .withMessage("Must specify a database title.")
      .isLength({ max: 32 })
      .withMessage("Database title must be within 32 characters.")
  ],
  databaseController.canSaveDatabase,
  upload.single("database"),
  databaseController.saveDatabase
);

app.get(
  "/database/load/:id",
  passportConfig.isAuthenticated,
  databaseController.loadDatabase
);

app.get(
  "/database/delete/:id",
  passportConfig.isAuthenticated,
  databaseController.deleteDatabase
);

app.get(
  "/group/list/all",
  passportConfig.isAuthenticated,
  groupController.listGroups
);

app.get(
  "/group/list/active",
  passportConfig.isAuthenticated,
  groupController.listActive
);

app.post(
  "/group/create",
  passportConfig.isAuthenticated,
  groupController.createGroup
);

app.get(
  "/group/join/:id",
  passportConfig.isAuthenticated,
  groupController.joinGroup
);

app.get(
  "/group/leave/current",
  passportConfig.isAuthenticated,
  groupController.leaveCurrentGroup
);

app.get(
  "/group/leave/:id",
  passportConfig.isAuthenticated,
  groupController.leaveGroup
);

// OAuth authentication routes. (Sign in)
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: "profile email" })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

app.get("/auth/twitter", passport.authenticate("twitter"));
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: "SOME STATE" })
);
app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

// Error Handler
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}

app.listen(app.get("port"), () => {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});
