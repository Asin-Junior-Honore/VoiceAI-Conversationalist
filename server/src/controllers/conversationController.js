const Conversation = require("../models/conversations");
const asyncHandler = require("../utils/asyncHandler");
const generateAIResponse = require("../utils/aiResponseGenerator");

// Store a conversation and respond with AI response
exports.saveConversation = asyncHandler(async (req, res) => {
  const { userMessage } = req.body;
  const userId = req.user.id;

  if (!userMessage) {
    return res.status(400).json({ error: "No user message provided" });
  }

  const aiResponse = generateAIResponse(userMessage);

  const conversation = new Conversation({ userId, userMessage, aiResponse });
  await conversation.save();

  res
    .status(201)
    .json({ message: "Conversation saved successfully", aiResponse });
});

// Fetch user conversations
exports.getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const conversations = await Conversation.find({ userId }).sort({
    timestamp: 1,
  });

  res.status(200).json(conversations);
});
