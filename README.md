# VoiceAI-Conversationalist

**VoiceAI-Conversationalist** is a voice-activated AI-based application that enables users to engage in real-time, two-way conversations with an AI system. Built to assist users with career guidance, tech advice, and job search tips, the application listens to user queries and provides relevant AI-generated responses. This project includes frontend and backend components to manage voice processing, conversation storage, and user authentication.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tip](#Tip)

## Features
- **Real-Time Conversation**: Users can engage in voice-based conversations with the AI.
- **Voice Recognition & Synthesis**: Uses Web Speech API to recognize user speech and synthesize AI responses.
- **Dynamic AI Responses**: Provides personalized responses based on the user’s input (e.g., "Who are you?", "career advice").
- **Conversation History**: Securely saves conversations, allowing users to view past exchanges.
- **Authentication**: Users can register, log in, and access their personal conversation history.

## Architecture
- **Frontend**: Built with React (TSX) and Vite, handling voice input and response display. Includes user registration, login, and settings for conversation control (e.g., voice speed, pitch).
- **Backend**: Node.js with Express, handling AI response generation, user authentication, and conversation storage in MongoDB. AI responses are customized based on keywords.
- **Database**: MongoDB is used to store user profiles, conversation history, and AI responses.
- **Speech Processing**: Web Speech API for recognition and Speech Synthesis API for AI voice output.

## Technologies Used
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, React Router DOM
- **Backend**: Node.js, Express.js, Mongoose, Passport.js
- **Database**: MongoDB

## Setup and Installation

### Prerequisites
- Node.js
- MongoDB


### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/VoiceAI-Conversationalist.git
   cd VoiceAI-Conversationalist
   ```

2. **Install Dependencies**:
   - **Backend**:
     ```bash
     cd server
     npm install
     ```
   - **Frontend**:
     ```bash
     cd ../client
     npm install
     ```

3. **Environment Variables**:
   In the `server` folder, create a `.env` file and add the following variables:

   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:
   - Start the backend:
     ```bash
     cd server
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd ../client
     npm run dev
     ```

5. **Access the Application**:
   Visit `http://localhost:3000` in your browser.

## Environment Variables
Ensure the following environment variables are set up in your `.env` file:

| Variable                | Description                                |
|-------------------------|--------------------------------------------|
| `MONGO_URI`             | Connection string for MongoDB              |
| `JWT_SECRET`            | Secret key for JSON Web Token (JWT)        |

## Usage
1. **Registration/Login**: Users register and log in to store and view their conversation history.
2. **Starting a Conversation**: Click "Start Conversation" to begin speaking with the AI. The AI listens, responds, and displays both the user’s query and AI’s response.
3. **Conversation History**: Users can view past conversations stored securely under their account.
4. **Voice Settings**: Users can adjust voice speed, pitch, and tone for a personalized experience.

### Example Conversation
- **User**: “Hello!”
  - **AI**: “Hello! How can I assist you today with your career or tech questions?”
- **User**: “Can you give me some job search tips?”
  - **AI**: “Sure! Here are some useful job search tips...”

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

### Coding Guidelines
- **Backend**: Separate logic by grouping into controllers, models, and utilities for maintainability.
- **Frontend**: Ensure components are modular and reusable.

Certainly! Here’s a tip section that you can add to the README for guiding users on crafting questions for better AI responses:



### Tip: Enhancing AI Responses
For more relevant and engaging responses from the AI, check the keywords and phrases that trigger specific answers. You can find these in the `aiResponseGenerator.js` file located in the `server` folder. Incorporating these keywords (e.g., "career," "tech field," "job search tips") in your message can help guide the AI to respond with information that best matches your query.
