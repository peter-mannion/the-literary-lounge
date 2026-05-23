// User routes

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", auth, getUsers); // testing only

module.exports = router;
