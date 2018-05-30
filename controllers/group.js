const passport = require("passport");

// Config
const config = require("../config/config");

// Models
const Group = require("../models/Group");
const UserGroup = require("../models/UserGroup");
const Database = require("../models/Database");

exports.getGroup = (req, res, next) => {
  const { id } = req.params;

  Group.findById(id, (err, group) => {
    if (err) next(err);

    return res.json(group);
  });
};

exports.removeUser = (req, res, next) => {
  const { groupId, userId } = req.params;

  UserGroup.findOneAndRemove({ group: groupId, user: userId }, err => {
    if (err) return next(err);

    return res.sendStatus(200);
  });
};

exports.updateGroup = (req, res, next) => {
  const { title } = req.body;
  const { id } = req.params;

  Group.findById(id, (err, group) => {
    if (err) return next(err);

    group.set("title", title);

    group.save((err, updatedGroup) => {
      if (err) return next(err);

      res.json(group);
    });
  });
};

exports.saveProgress = (req, res, next) => {
  UserGroup.findOne(
    { group: req.session.group._id, user: req.user.id },
    (err, usergroup) => {
      if (err) return next(err);

      usergroup.set({ questions: req.body.questions });

      usergroup.save((err, updatedUserGroup) => {
        if (err) return next(err);

        // Update the session
        const newGroup = {
          ...req.session.group,
          questions: req.body.questions
        };

        req.session.group = newGroup;

        res.send(updatedUserGroup);
      });
    }
  );
};

exports.listGroups = (req, res, next) => {
  // Find all the groups that this user is part of so we can exclude them from the list.
  UserGroup.find({ user: req.user.id }, (err, userGroups) => {
    // Extract all the group id's
    const userGroupsID = userGroups.map(usergroup => usergroup.group);

    // Construct the query specifying no groups in the users to be selected.
    Group.find()
      .where("_id")
      .nin(userGroupsID)
      .exec((err, groups) => {
        if (err) return next(err);

        return res.json(groups);
      });
  });
};

exports.listActive = (req, res, next) => {
  UserGroup.find({ user: req.user.id })
    .populate("group")
    .exec((err, usergroups) => {
      if (err) return next(err);

      return res.json(usergroups);
    });
};

exports.joinGroup = (req, res, next) => {
  const { id } = req.params;

  // Check that this user is not already in this group
  UserGroup.findOne({ user: req.user.id, group: id })
    .populate("group")
    .exec((err, existingUserGroup) => {
      if (err) return next(err);

      if (existingUserGroup) {
        // Construct a group object with the users question set.
        const userGroupObject = {
          ...existingUserGroup.group.toJSON(),
          questions: existingUserGroup.questions
        };

        // Save the group to the session
        req.session.group = userGroupObject;

        return res.json(userGroupObject);
      } else {
        // If a user group doesn't already exist, create one.
        const obj = new UserGroup({
          user: req.user.id,
          group: group.id
        });

        obj.save(err => {
          if (err) next(err);

          // Save the group to the session
          req.session.group = existingUserGroup.group;

          return res.json(existingUserGroup);
        });
      }
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

exports.leaveCurrentGroup = (req, res, next) => {
  // Just set/remove any current session.
  req.session.group = null;

  return res.sendStatus(200);
};

exports.leaveGroup = (req, res, next) => {
  const { id } = req.params;

  Group.find({ _id: id, creator: req.user.id }, (err, ownedGroup) => {
    if (err) return next(err);

    // Cannot leave your own groups!
    if (ownedGroup) {
      return res.status(403).json({
        error: {
          message: "You cannot leave a group that you are the owner of."
        }
      });
    }

    UserGroup.findOneAndRemove({ group: id, user: req.user.id }, err => {
      if (err) return next(err);

      return res.sendStatus(200);
    });
  });
};

exports.deleteGroup = (req, res, next) => {
  const { id } = req.params;

  Group.findOneAndRemove({ _id: id, creator: req.user.id }, err => {
    if (err) return next(err);

    return res.sendStatus(200);
  });
};
