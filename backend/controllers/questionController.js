const Question = require("../models/question");

// GET all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("topic", "name description")
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("topic", "name description")
      .populate("user", "username");

    if (!question) return res.status(404).json({ error: "Question not found" });

    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET questions by topic
exports.getQuestionsByTopic = async (req, res) => {
  try {
    const questions = await Question.find({ topic: req.params.topicId })
      .populate("topic", "name")
      .populate("user", "username");

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE a question
exports.createQuestion = async (req, res) => {
  try {
    const { title, body, topic, user } = req.body;

    const question = await Question.create({
      title,
      body,
      topic,
      user,
    });

    res.status(201).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
