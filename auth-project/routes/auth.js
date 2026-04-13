const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//
// ========================
// SIGNUP ROUTE
// ========================
//
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.json({
      message: "Signup successful"
    });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

//
// ========================
// LOGIN ROUTE
// ========================
//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;