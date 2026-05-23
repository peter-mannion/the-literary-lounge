const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already taken" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed password:", hashedPassword);

    // Create new user with hashed password
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
