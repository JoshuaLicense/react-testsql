const bluebird = require("bluebird");
const crypto = bluebird.promisifyAll(require("crypto"));
const passport = require("passport");

// Config
const config = require("../config/config");

// Models
const User = require("../models/User");
const Database = require("../models/Database");

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

  return res.json({ msg: "Good" });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.register = (req, res, next) => {
  req.assert("username", "Username is not valid").notEmpty();
  req.assert("password", "Password must be at least 4 characters long").len(4);

  req
    .assert("confirmPassword", "Passwords do not match")
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json({ error: errors });
  }

  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(400).json({ error: "That username is already taken." });
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
