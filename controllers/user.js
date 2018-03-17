const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const passport = require('passport');

// Config
const config = require('../config/config');

// User model
const User = require('../models/User');

/**
 * POST /login
 * Sign in using email and password.
 */
exports.login = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({ error: errors });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ error: info });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({ user: req.user });
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();

  return res.json({ msg: 'Good' });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.register = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({ error: errors });
  }

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(400).json({ error: 'That email is already taken.' });
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.json({ user: req.user });
      });
    });
  });
};

exports.canSaveDB = (req, res, next) => {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }

    // Check if the user has reached their upload limit
    if (user.savedDatabases.length >= config.database.limit) {
      return res.json({ error: 'You have reached the limit of saved databases' });
    }
  });
};

exports.saveDB = (req, res, next) => {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      return next(err);
    }

    // Check if the user has reached their upload limit
    //if(user.savedDatabases > config.database.)

    user.savedDatabases.push(req.file.filename);

    user.save((err) => {
      if (err) {
        return next(err);
      }
    });
  });
};