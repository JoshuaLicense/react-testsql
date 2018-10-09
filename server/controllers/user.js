const passport = require("passport");

// Config
const config = require("../config/config");

// Models
const User = require("../models/User");
const Database = require("../models/Database");

const { check, validationResult } = require("express-validator/check");

/**
 * POST /login
 * Sign in using username and password.
 */
exports.login = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ error: info });
    }

    req.login(user, err => {
      if (err) {
        return next(err);
      }

      const user = {
        id: req.user.id,
        username: req.user.username,
        group: req.session.group || null
      };

      return res.json(user);
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  // Destroy the session
  req.session.destroy();

  req.logout();

  return res.json({ msg: "Good" });
};

exports.info = (req, res) => {
  if (req.isAuthenticated()) {
    const user = {
      id: req.user.id,
      username: req.user.username,
      group: req.session.group || null
    };

    return res.json(user);
  }

  return res.sendStatus(403);
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      return res.status(400).json({
        error: { message: "This username already exists." }
      });
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }

      req.logIn(user, err => {
        if (err) {
          return next(err);
        }

        return res.json({ user: req.user });
      });
    });
  });
};
