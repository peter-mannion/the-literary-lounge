// Seed DB with random users

require("dotenv").config();
const connectDB = require("./config/db");
const user = require("./models/user");

const randomUsername = () => {
  const baseName = "reader";
  const num = Math.floor(Math.random() * 1000);
  return `${baseName}_${num}`;
};

const randomPassword = () => {
  const pword = "password";
  return `${pword}_${Math.random().toString(10).slice(2, 6)}`;
};

const seedUsers = async () => {
  try {
    await connectDB();
    // await user.deleteMany();

    const users = Array.from({ length: 3 }).map(() => ({
      username: randomUsername(),
      password: randomPassword(),
    }));

    await user.insertMany(users);
    console.log("Random users seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
