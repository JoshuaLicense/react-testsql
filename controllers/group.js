const passport = require("passport");

// Config
const config = require("../config/config");

// Models
const Group = require("../models/Group");

exports.listGroup = (req, res, next) => {
  res.json([
    {
      _id: "abcdefghijklmnop",
      title: "Group #1",
      createdBy: "Joshua License",
      createdAt: "12/05/2017",
      capacity: 5,
      isPrivate: true
    },
    {
      _id: "abcdefghijvklmnop",
      title: "Group #3",
      createdBy: "Charles Boisvert",
      createdAt: "12/05/2005",
      capacity: 8,
      isPrivate: false
    },
    {
      _id: "abcdefghijaklmnop",
      title: "Group #2",
      createdBy: "Joshua License",
      createdAt: "12/05/2018",
      capacity: 12,
      isPrivate: false
    }
  ]);
};

exports.listMine = (req, res, next) => {
  res.json([
    {
      _id: "abcdefghijklmnop",
      title: "Group #1",
      createdBy: "Joshua License",
      createdAt: "12/05/2017",
      capacity: 5,
      isPrivate: true
    }
  ]);
};

exports.joinGroup = (req, res, next) => {
  res.status(400).json("NOT IMPLEMENTED");
};

exports.createGroup = (req, res, next) => {
  res.status(400).send("NOT IMPLEMENTED");
};

exports.leaveGroup = (req, res, next) => {
  res.status(400).json("NOT IMPLEMENTED");
};
