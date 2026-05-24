const mongoose = require("mongoose");
const Topic = require("./models/Topic");
const Question = require("./models/Question");

const MONGO_URI = "mongodb://127.0.0.1:27017/literary_lounge";

const topics = [
  {
    name: "Mystery/Thriller",
    description: "Suspenseful stories full of twists, secrets, and tension.",
  },
  {
    name: "Fantasy",
    description: "Magic, mythical beings, and otherworldly adventures.",
  },
  {
    name: "Science Fiction",
    description: "Futuristic worlds, advanced tech, and speculative ideas.",
  },
  {
    name: "Historical Fiction",
    description: "Stories grounded in real historical settings.",
  },
  {
    name: "Classic Fiction",
    description: "Timeless works that shaped literature.",
  },
  {
    name: "Modern Fiction",
    description: "Contemporary stories exploring modern themes.",
  },
  {
    name: "Romance",
    description: "Love stories full of emotion and connection.",
  },
];

const questionsByTopic = {
  "Mystery/Thriller": [
    {
      title: "Best mystery with an unexpected twist?",
      body: "Looking for a book that genuinely surprised you.",
    },
    {
      title: "Favorite detective character?",
      body: "Who stands out as the most iconic detective?",
    },
    {
      title: "Most atmospheric thriller?",
      body: "Which book had tension you could *feel*?",
    },
  ],
  Fantasy: [
    {
      title: "Best fantasy worldbuilding?",
      body: "Which author creates the most immersive worlds?",
    },
    {
      title: "Favorite magic system?",
      body: "Hard magic, soft magic — what works best?",
    },
    {
      title: "Most underrated fantasy series?",
      body: "Hidden gems that deserve more attention.",
    },
  ],
  "Science Fiction": [
    {
      title: "Best sci-fi novel of all time?",
      body: "What stands above the rest?",
    },
    {
      title: "Favorite AI-themed story?",
      body: "Books exploring artificial intelligence in unique ways.",
    },
    {
      title: "Hard sci-fi recommendations?",
      body: "Looking for science-heavy, realistic sci-fi.",
    },
  ],
  "Historical Fiction": [
    {
      title: "Most immersive historical setting?",
      body: "Which book transported you to another era?",
    },
    {
      title: "Best WW2 historical fiction?",
      body: "Looking for powerful, emotional reads.",
    },
    {
      title: "Favorite ancient history novel?",
      body: "Rome, Greece, Egypt — what stands out?",
    },
  ],
  "Classic Fiction": [
    {
      title: "Most influential classic novel?",
      body: "Which book shaped literature the most?",
    },
    {
      title: "Favorite 19th-century author?",
      body: "Who defined the era for you?",
    },
    {
      title: "Classic that surprised you?",
      body: "A book that was better than expected.",
    },
  ],
  "Modern Fiction": [
    {
      title: "Best contemporary novel?",
      body: "Looking for modern masterpieces.",
    },
    {
      title: "Favorite character-driven story?",
      body: "Books with unforgettable characters.",
    },
    {
      title: "Most unique narrative style?",
      body: "Experimental or unusual storytelling.",
    },
  ],
  Romance: [
    {
      title: "Best slow-burn romance?",
      body: "Looking for tension done right.",
    },
    {
      title: "Favorite romance trope?",
      body: "Enemies-to-lovers, friends-to-lovers, etc.",
    },
    {
      title: "Most emotional romance novel?",
      body: "A book that hit you right in the heart.",
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Topic.deleteMany({});
    await Question.deleteMany({});
    console.log("Cleared existing data");

    // Insert topics
    const createdTopics = await Topic.insertMany(topics);
    console.log("Inserted topics");

    // Insert questions for each topic
    const questionDocs = [];

    for (const topic of createdTopics) {
      const topicName = topic.name;
      const topicQuestions = questionsByTopic[topicName];

      for (const q of topicQuestions) {
        questionDocs.push({
          ...q,
          topic: topic._id,
          user: null,
        });
      }
    }

    await Question.insertMany(questionDocs);
    console.log("Inserted questions");

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
