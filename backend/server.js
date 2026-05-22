require("dotenv").config();
console.log("PORT VALUE:", JSON.stringify(process.env.PORT));

const express = require("express");
const app = express();

const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/users", require("./routes/userRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
