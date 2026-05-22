const Answer = require("../models/answer");

// GET all answers for a question
exports.getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE an answer
exports.createAnswer = async (req, res) => {
  try {
    const { body, question, user } = req.body;

    const answer = await Answer.create({
      body,
      question,
      user,
    });

    res.status(201).json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
