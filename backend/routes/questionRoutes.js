const express = require("express");
const router = express.Router();

const {
  getQuestions,
  getQuestionById,
  getQuestionsByTopic,
  createQuestion,
} = require("../controllers/questionController");

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.get("/topic/:topicId", getQuestionsByTopic);
router.post("/", createQuestion);

module.exports = router;
