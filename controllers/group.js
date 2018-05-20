const passport = require("passport");

// Config
const config = require("../config/config");

// Models
const Group = require("../models/Group");
const UserGroup = require("../models/UserGroup");
const Database = require("../models/Database");

exports.listGroups = (req, res, next) => {
  Group.find((err, groups) => {
    if (err) {
      return next(err);
    }

    return res.json(groups);
  });
};

exports.listActive = (req, res, next) => {
  UserGroup.find({ user: req.user.id })
    .populate("Group")
    .exec((err, usergroups) => {
      if (err) {
        return next(err);
      }

      return res.json(usergroups);
    });
};

exports.joinGroup = (req, res, next) => {
  const { id } = req.params;

  Group.findById(id, (err, group) => {
    if (err) next(err);

    // Check that this user is not already in this group
    UserGroup.findOne({ user: req.user.id }, (err, existingUserGroup) => {
      if (err) return next(err);

      if (existingUserGroup) {
        return res.status(400).json({
          errors: {
            duplicate: { msg: "You are already a member of this group." }
          }
        });
      }

      const obj = new UserGroup({
        user: req.user.id,
        group: group.id
      });

      obj.save(err => {
        if (err) next(err);
      });

      return res.sendStatus(200);
    });
  });
};

exports.createGroup = (req, res, next) => {
  const { title, databaseID } = req.body;

  // Make sure the database chosen actually exists
  Database.findById(databaseID, (err, database) => {
    if (err) next(err);

    // Create a new group instance
    const obj = new Group({
      title: title,
      creator: req.user.id,
      database: database.id
    });

    obj.save(err => {
      if (err) return next(err);

      return res.sendStatus(200);
    });
  });
};

exports.leaveGroup = (req, res, next) => {
  const { id } = req.params;

  UserGroup.findOneAndRemove({ group: id, user: req.user.id }, err => {
    if (err) return next(err);

    return res.sendStatus(200);
  });
};

exports.deleteGroup = (req, res, next) => {
  const { id } = req.params;

  Group.findOneAndRemove({ _id: id, creator: req.user.id }, err => {
    if (err) return next(err);

    return res.sendStatus(200);
  });
};
