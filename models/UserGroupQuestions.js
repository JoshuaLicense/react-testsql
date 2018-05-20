const mongoose = require("mongoose");

const { Schema } = mongoose;

const userGroupQuestionsSchema = new mongoose.Schema(
  {
    userGroup: {
      type: Schema.Types.ObjectId,
      ref: "UserGroup",
      required: true
    },
    questions: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const UserGroupQuestions = mongoose.model(
  "UserGroupQuestions",
  userGroupQuestionsSchema
);

module.exports = UserGroup;
