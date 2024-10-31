function generateAIResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();

  if (lowerCaseMessage.includes("hello")) {
    return "Hello! How can I assist you today with your career or tech questions?";
  } else if (lowerCaseMessage.includes("help")) {
    return "Sure, I'm here to help. Do you need assistance with career advice, tech skills, or something else?";
  } else if (lowerCaseMessage.includes("bye")) {
    return "Goodbye! Best of luck with your career journey!";
  } else if (lowerCaseMessage.includes("career")) {
    return (
      "Absolutely! The AI and tech fields offer many exciting career paths. Some popular roles include:\n\n" +
      " Machine Learning Engineer: Focuses on designing and implementing machine learning models.\n" +
      " Data Scientist: Works on data analysis and creating predictive models.\n" +
      " AI Research Scientist: Conducts cutting-edge research in AI algorithms and applications.\n" +
      " NLP Engineer: Specializes in processing and understanding human language data.\n" +
      " Computer Vision Engineer: Develops systems for interpreting and processing visual data.\n\n" +
      " Let me know if you'd like more details about any specific role!"
    );
  } else if (lowerCaseMessage.includes("tech field")) {
    return (
      "The tech field is vast and varied! Here are some major areas you could explore:\n\n" +
      " Software Development: Includes web, mobile, and application development.\n" +
      " Cybersecurity: Focuses on protecting systems and data from cyber threats.\n" +
      " Cloud Computing: Involves working with cloud platforms like AWS, Azure, or Google Cloud.\n" +
      " Data Engineering: Responsible for building and managing data infrastructure.\n" +
      " Blockchain Development: Works on decentralized systems and cryptocurrency.\n\n" +
      " I’d be happy to help you find resources or answer questions about any of these areas!"
    );
  } else if (lowerCaseMessage.includes("who are you")) {
    return "I’m your AI Career Advisor! I'm here to provide guidance on career options, tech skills, and pathways within the tech and AI fields. Feel free to ask me about different roles, industries, or specific skills you'd like to explore!";
  } else if (lowerCaseMessage.includes("trends in tech")) {
    return (
      "Tech is always evolving! Some current trends include:\n\n" +
      " AI and Machine Learning: These are transforming industries like healthcare, finance, and e-commerce.\n" +
      " Cybersecurity: With increasing cyber threats, this area is critical for all sectors.\n" +
      " Blockchain and Web3: Decentralized applications are gaining traction in finance and beyond.\n" +
      " Quantum Computing: An emerging field with potential to revolutionize complex computations.\n\n" +
      " Let me know if you'd like resources or insights into any of these trends!"
    );
  } else if (lowerCaseMessage.includes("job search tips")) {
    return (
      "Job searching can be challenging, but here are some tips:\n\n" +
      " Network: Reach out on LinkedIn and attend tech meetups.\n" +
      " Portfolio: Showcase your work on GitHub or a personal website.\n" +
      " Tailor Your Resume: Highlight relevant skills and experiences.\n" +
      " Prepare for Interviews: Practice common technical and behavioral questions.\n\n" +
      " I can help with specific interview prep or skills if you have a role in mind!"
    );
  } else {
    return "I'm not sure how to respond to that, but I'm here to help with career advice or tech questions!";
  }
}

module.exports = generateAIResponse;
