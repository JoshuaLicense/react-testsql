const mongoose = require("mongoose");

const { Schema } = mongoose;

const userGroupSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    questions: {
      type: Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const UserGroup = mongoose.model("UserGroup", userGroupSchema);

module.exports = UserGroup;
