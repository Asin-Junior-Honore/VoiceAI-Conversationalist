const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");
const authMiddleware = require("../middleware/authMiddleware"); // Import your custom middleware

// Route to save a conversation
router.post("/save", authMiddleware, conversationController.saveConversation);

// Route to get all conversations for the authenticated user
router.get("/", authMiddleware, conversationController.getUserConversations);

module.exports = router;
