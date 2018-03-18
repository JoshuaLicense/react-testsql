const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new mongoose.Schema({
  title: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  database: { type: Schema.Types.ObjectId, ref: 'Database' },
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
