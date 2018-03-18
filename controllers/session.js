const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const passport = require('passport');

// Config
const config = require('../config/config');

// Models
const Session = require('../models/Session');

exports.listSession = (req, res, next) => {
  res.send('NOT IMPLEMENTED');
};

exports.joinSession = (req, res, next) => {
  res.send('NOT IMPLEMENTED');
};

exports.createSession = (req, res, next) => {
  res.send('NOT IMPLEMENTED');
};

exports.leaveSession = (req, res, next) => {
  res.send('NOT IMPLEMENTED');
};
