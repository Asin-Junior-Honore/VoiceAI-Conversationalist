const Conversation = require("../models/conversations");
const asyncHandler = require("../utils/asyncHandler");

// Store a conversation and respond with AI response
exports.saveConversation = asyncHandler(async (req, res) => {
  const { userMessage } = req.body;
  const userId = req.user.id;

  if (!userMessage) {
    return res.status(400).json({ error: "No user message provided" });
  }

  // Generate AI response based on the user message
  let aiResponse;
  if (userMessage.toLowerCase().includes("hello")) {
    aiResponse = "Hello! How can I assist you today?";
  } else if (userMessage.toLowerCase().includes("help")) {
    aiResponse = "Sure, I am here to help. What do you need assistance with?";
  } else if (userMessage.toLowerCase().includes("bye")) {
    aiResponse = "Goodbye! Have a great day!";
  } else {
    aiResponse = "I'm not sure how to respond to that, but I'm here to help!";
  }

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
