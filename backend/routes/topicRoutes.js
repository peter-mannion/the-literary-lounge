// Topic routes

const express = require("express");
const router = express.Router();
const {
  getTopics,
  getTopicById,
  createTopic,
} = require("../controllers/topicController");

// GET all topics
router.get("/", getTopics);

// GET a single topic by ID
router.get("/:id", getTopicById);

// POST create a new topic - future app development
router.post("/", createTopic);

module.exports = router;
