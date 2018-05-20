const passport = require("passport");

const fs = require("fs");

// Config
const config = require("../config/config");

// Models
const Database = require("../models/Database");

const { check, validationResult } = require("express-validator/check");

exports.listDatabase = (req, res, next) => {
  Database.find({ creator: req.user.id }, (err, databases) => {
    if (err) {
      return next(err);
    }

    return res.json(databases);
  });
};

exports.canSaveDatabase = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  Database.find({ creator: req.user.id }, (err, databases) => {
    if (err) {
      return next(err);
    }

    // Check if the user has reached their upload limit
    if (databases.length >= config.database.limit) {
      return res.status(403).json({
        error: { message: "You have reached the limit of saved databases" }
      });
    }

    return next();
  });
};

exports.saveDatabase = (req, res, next) => {
  // Create a new database instance
  const database = new Database({
    title: req.params.title,
    path: req.file.filename,
    creator: req.user.id
  });

  database.save(err => {
    if (err) return next(err);
  });

  return res.json(database);
};

exports.loadDatabase = (req, res, next) => {
  const { id } = req.params;

  Database.findById(id, (err, database) => {
    const filename = database.path;

    const options = {
      root: `./saves/`,
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
      }
    };

    res.sendFile(filename, options, err => {
      if (err) return next(err);
    });
  });
};

exports.deleteDatabase = (req, res, next) => {
  const { id } = req.params;

  Group.findOne({ database: id }, (err, dependantGroup) => {
    if (err) return next(err);

    if (dependantGroup) {
      return res.status(400).json({
        error: {
          message: "Cannot delete a database that a group depends upon."
        }
      });
    }

    Database.findOneAndRemove(
      { _id: id, creator: req.user.id },
      (err, database) => {
        if (err) return next(err);

        // Remove the file from the server too.
        fs.unlink(`./saves/${database.path}`);

        return res.sendStatus(200);
      }
    );
  });
};
