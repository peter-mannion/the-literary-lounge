const express = require("express");
const router = express.Router();

const {
  getAnswersByQuestion,
  createAnswer,
} = require("../controllers/answerController");

router.get("/question/:questionId", getAnswersByQuestion);
router.post("/", createAnswer);

module.exports = router;
