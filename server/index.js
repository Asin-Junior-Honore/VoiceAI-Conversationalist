const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const conversationRoutes = require("./src/routes/conversationRoutes");
require("dotenv").config();
require("./src/config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route to check server health
app.get("/", (req, res) => {
  res.send("Voice AI Backend is running");
});

// routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/conversations", conversationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
