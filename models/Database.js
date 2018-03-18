const mongoose = require('mongoose');

const { Schema } = mongoose;

const databaseSchema = new mongoose.Schema({
  title: String,
  path: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
