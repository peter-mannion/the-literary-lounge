// Question Schema

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topic",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("question", questionSchema);
