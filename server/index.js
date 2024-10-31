const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const routes = require("./src/routes");
require("dotenv").config();
require("./src/config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Voice AI Backend is running"));
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
