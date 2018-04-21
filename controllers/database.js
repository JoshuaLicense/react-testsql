const bluebird = require("bluebird");
const crypto = bluebird.promisifyAll(require("crypto"));
const passport = require("passport");

// Config
const config = require("../config/config");

// Models
const Database = require("../models/Database");

exports.listDatabase = (req, res, next) => {
  Database.find({ creator: req.user.id }, (err, databases) => {
    if (err) {
      return next(err);
    }

    return res.json(databases);
  });
};

exports.canSaveDatabase = (req, res, next) => {
  Database.find({ creator: req.user.id }, (err, databases) => {
    if (err) {
      return next(err);
    }

    // Check if the user has reached their upload limit
    if (databases.length >= config.database.limit) {
      return res.json({
        error: "You have reached the limit of saved databases"
      });
    }

    return next();
  });
};

exports.saveDatabase = (req, res, next) => {
  // Create a new database instance
  const database = new Database({
    title: req.body.title,
    path: req.file.filename,

    creator: req.user.id
  });

  database.save(err => {
    if (err) {
      return next(err);
    }
  });

  return res.json(database);
};

exports.loadDatabase = (req, res, next) => {
  res.send("NOT IMPLEMENTED");
};
