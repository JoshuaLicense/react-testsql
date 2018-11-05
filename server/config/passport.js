const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

//const TwitterStrategy = require('passport-twitter').Strategy;
//const GitHubStrategy = require('passport-github').Strategy;
//const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Sign in using Name and Password.
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, `Username ${username} not found.`);
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (isMatch) {
          return done(null, user);
        }

        return done(null, false, "Invalid username or password.");
      });
    });
  })
);
