const express = require("express");
const authRoutes = require("./authRoutes");
const conversationRoutes = require("./conversationRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversations", conversationRoutes);

module.exports = router;
