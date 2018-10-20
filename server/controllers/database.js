const fs = require("fs");

// Config
const config = require("../config/config");

// Models
const Database = require("../models/Database");
const Group = require("../models/Group");

const { validationResult } = require("express-validator/check");

// The directory that the saved database files will be stored.
const DIRECTORY = "./saves/";

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

  // If there are express errors, extract the error.
  // As we only expect the title being invalid.
  if (!errors.isEmpty()) {
    const errorMessage = errors.mapped().title.msg;

    return res.status(422).json(errorMessage);
  }

  Database.find({ creator: req.user.id }, (err, databases) => {
    if (err) return next(err);

    // Check if the user has reached their upload limit
    if (databases.length >= config.database.limit) {
      return res
        .status(403)
        .json("You have reached the limit of saved databases");
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
    if (err) return next(err);

    if (!database) {
      return res.status(404).json("Database not found in the database.");
    }

    const filename = database.path;

    const options = {
      root: DIRECTORY,
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
      }
    };

    const filepath = `${DIRECTORY}${filename}`;

    // Check the file actually exists.
    if (!fs.existsSync(filepath)) {
      return res.status(404).json("Database not found on the filesystem.");
    }

    res.sendFile(filename, options);
  });
};

exports.deleteDatabase = (req, res, next) => {
  const { id } = req.params;

  Group.findOne({ database: id })
    .select("title")
    .lean()
    .exec((err, dependantGroup) => {
      if (err) return next(err);

      // Can't remove a database that a group depends on.
      if (dependantGroup) {
        return res
          .status(400)
          .json(
            `Cannot delete this database as the group "${
              dependantGroup.title
            }" uses it.`
          );
      }

      Database.findOneAndRemove(
        { _id: id, creator: req.user.id },
        (err, database) => {
          if (err) return next(err);

          // The entry was removed from the database.
          // Ignore if the unlink doesn't work. It's gone.
          // Remove the file from the server too if it exists.
          return fs.unlink(`${DIRECTORY}${database.path}`, () =>
            res.sendStatus(200)
          );
        }
      );
    });
};
