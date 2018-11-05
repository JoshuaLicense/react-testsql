const express = require("express");
const mongoose = require("mongoose");

const errorhandler = require("errorhandler");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const passport = require("passport");
const bodyParser = require("body-parser");

const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");

const path = require("path");

const chalk = require("chalk");

const dotenv = require("dotenv");

// Load the env settings & API keys (eventually)
dotenv.load({ path: ".env" });

// Controllers
const userController = require("./controllers/user");
const databaseController = require("./controllers/database");
const groupController = require("./controllers/group");

const Group = require("./models/Group");

// Config
const config = require("./config/config");

// API keys and Passport configuration.
const passportConfig = require("./config/passport");

// Create express server
const app = express();

// Connect to the database
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", err => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
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
    cookie: { maxAge: 1209600000 },
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "client", "build")));

// Routes
app.post(
  "/api/user/register",
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
  "/api/user/login",
  [
    check("username")
      .exists()
      .isLength({ max: 32 }),

    check("password").exists()
  ],
  userController.login
);

app.get("/api/user/info", userController.info);

app.get("/api/user/logout", userController.logout);

app.get(
  "/api/database/list",
  passportConfig.isAuthenticated,
  databaseController.listDatabase
);

// Title is in the "get" as express doesn't deal with FormData,
// which is what the saved database binary will be sent as.
app.post(
  "/api/database/save/:title?",
  passportConfig.isAuthenticated,
  [
    check("title")
      .exists()
      .withMessage("Must specify a database title.")
      .isLength({ max: 32 })
      .withMessage("Database title must be within 32 characters.")
  ],
  databaseController.canSaveDatabase,
  databaseController.uploadDatabase,
  databaseController.saveDatabase
);

app.get(
  "/api/database/load/:id",
  passportConfig.isAuthenticated,
  databaseController.loadDatabase
);

app.get(
  "/api/database/delete/:id",
  passportConfig.isAuthenticated,
  databaseController.deleteDatabase
);

const canManageGroup = (req, res, next) => {
  Group.findById(req.params.groupId)
    .lean()
    .exec((err, group) => {
      // TODO: expand this to allow others to manage this group
      if (group.creator.equals(req.user.id)) {
        return next();
      }

      return res.status(401).json({
        error: "You do not have permissions to manage this group"
      });
    });
};

app.get(
  "/api/group/:groupId/remove/:userId",
  passportConfig.isAuthenticated,
  canManageGroup,
  groupController.removeUser
);

app.post(
  "/api/group/update/:groupId",
  [
    check("title")
      .not()
      .isEmpty()
      .withMessage("Must specify a database title.")
      .isLength({ max: 32 })
      .withMessage("Database title must be within 32 characters.")
      .trim()
      .escape()
  ],
  passportConfig.isAuthenticated,
  canManageGroup,
  groupController.updateGroup
);

app.post(
  "/api/group/save-progress",
  passportConfig.isAuthenticated,
  groupController.saveProgress
);

app.get(
  "/api/group/:id",
  passportConfig.isAuthenticated,
  groupController.getGroup
);

app.get(
  "/api/group/list/all",
  passportConfig.isAuthenticated,
  groupController.list
);
/*
app.get(
  "/api/group/list",
  passportConfig.isAuthenticated,
  groupController.listAvailable
);

app.get(
  "/api/group/list/active",
  passportConfig.isAuthenticated,
  groupController.listActive
);*/

app.post(
  "/api/group/create",
  [
    check("title")
      .exists()
      .withMessage("Must specify a group title.")
      .isLength({ max: 32 })
      .withMessage("Group title must be within 32 characters.")
  ],
  passportConfig.isAuthenticated,
  groupController.createGroup
);

app.get(
  "/api/group/join/:id",
  passportConfig.isAuthenticated,
  groupController.joinGroup
);

app.get(
  "/api/group/leave/current",
  passportConfig.isAuthenticated,
  groupController.leaveCurrentGroup
);

app.get(
  "/api/group/leave/:id",
  passportConfig.isAuthenticated,
  groupController.leaveGroup
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Error Handler
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}

app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );

  console.log("  Press CTRL-C to stop\n");
});
