const mongoose = require("mongoose");

const { Schema } = mongoose;

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    database: {
      type: Schema.Types.ObjectId,
      ref: "Database"
    }
  },
  {
    timestamps: true
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
