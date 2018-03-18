const express = require('express');
const mongoose = require('mongoose');

const errorHandler = require('errorhandler');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const path = require('path');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'saves') });

const dotenv = require('dotenv');

// Load the env settings & API keys (eventually)
dotenv.load({ path: '.env' });

// Controllers
const userController = require('./controllers/user');
const databaseController = require('./controllers/database');
const sessionController = require('./controllers/session');

// Config
const config = require('./config/config');

// API keys and Passport configuration.
const passportConfig = require('./config/passport');

// Create express server
const app = express();

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
    clear_interval: 3600,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Express only serves static assets in production
if (app.get('env') === 'production') {
  app.use(express.static('client/build'));
}

// Routes
app.post('/register', userController.register);

app.post('/login', userController.login);
app.get('/logout', userController.logout);

app.get('/database/list', passportConfig.isAuthenticated, databaseController.listDatabase);
app.post('/database/save', passportConfig.isAuthenticated, databaseController.canSaveDatabase, upload.single('database'), databaseController.saveDatabase);
app.get('/database/load/:id', passportConfig.isAuthenticated, databaseController.loadDatabase);

app.get('/session/list', passportConfig.isAuthenticated, sessionController.listSession);
app.post('/session/create', passportConfig.isAuthenticated, sessionController.createSession);
app.get('/session/join/:id', passportConfig.isAuthenticated, sessionController.joinSession);

// OAuth authentication routes. (Sign in)
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

// Error Handler
app.use(errorHandler());

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});
