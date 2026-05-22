const Topic = require("../models/topic");
console.log("Topic model:", Topic);

// GET all topics
exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET topic by ID
exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE topic
exports.createTopic = async (req, res) => {
  try {
    const { name } = req.body;

    const topic = await Topic.create({ name });
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
