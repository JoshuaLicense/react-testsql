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
    questions: [
      {
        title: String,
        set: String,
        question: String,
        answer: String,
        completed: Boolean,
        error: Boolean
      }
    ]
  },
  {
    timestamps: true
  }
);

const UserGroup = mongoose.model("UserGroup", userGroupSchema);

module.exports = UserGroup;
