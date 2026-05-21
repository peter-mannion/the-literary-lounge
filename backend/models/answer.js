// Answer Schema

const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("answer", answerSchema);
