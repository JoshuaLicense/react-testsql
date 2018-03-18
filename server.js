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
// API keys and Passport configuration.
const passportConfig = require('./config/passport');

// Create express server
const app = express();

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

// Error Handler
app.use(errorHandler());

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});
