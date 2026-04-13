const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//
// ========================
// MIDDLEWARE
// ========================
//
app.use(cors());
app.use(express.json());

//
// ========================
// ROUTES
// ========================
//
app.use("/api", require("./routes/auth"));

//
// ========================
// DATABASE CONNECT
// ========================
//
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

//
// ========================
// SERVER START
// ========================
//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});