const Conversation = require("../models/conversations");

// Store a conversation and respond with AI response
exports.saveConversation = async (req, res) => {
  try {
    const { userMessage } = req.body;
    const userId = req.user.id; // Ensure Passport.js authentication adds req.user

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

    // Save both userMessage and aiResponse to the database
    const conversation = new Conversation({ userId, userMessage, aiResponse });
    await conversation.save();

    // Send both the success message and the AI response back to the client
    res
      .status(201)
      .json({ message: "Conversation saved successfully", aiResponse });
  } catch (error) {
    console.error("Error saving conversation:", error);
    res.status(500).json({ error: "Error saving conversation" });
  }
};

// Fetch user conversations
exports.getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({ userId }).sort({
      timestamp: -1,
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Error fetching conversations" });
  }
};
