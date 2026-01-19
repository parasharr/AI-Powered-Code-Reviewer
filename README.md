# AI Powered Code Reviewer

## Overview

AI Powered Code Reviewer is a MERN stack web application that uses the Gemini API to automatically analyze and review source code. It provides intelligent feedback on bugs, performance, security, and best practices to help developers write cleaner and more maintainable code.

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Gemini API
- **Architecture:** MERN (REST APIs)

---

## Features

- AI-based automated code review
- Bug detection and best practice suggestions
- Performance and security insights
- Supports multiple programming languages
- Clean and responsive UI

---

## How It Works

1. User submits code through the frontend
2. Backend sends code to Gemini API for analysis
3. AI generates structured review feedback
4. Results are displayed instantly to the user

---

## Project Structure

```text
ai-code-reviewer/
├── client/          # React frontend
├── backend/
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   ├── services/    # Gemini API integration
│   └── app.js
├── .env
└── README.md
```

## Environment Variables

Create a .env file in the backend directory:

```env
GEMINI_API_KEY=your_api_key_here
MONGO_URI=your_mongodb_uri
PORT=5000
```

## Installation & Setup

```bash
git clone https://github.com/your-username/ai-powered-code-reviewer.git

cd backend
npm install

cd ../client
npm install

npm run dev
npm start
```

## Use Cases

1. Automated code reviews for developers
2. Learning and improving coding standards
3. AI-powered developer productivity tool

## Future Enhancements

1. GitHub pull request integration
2. Code quality scoring system
3. User authentication and review history
4. Repository-level code analysis

---

## Deployment

### Backend Deployment (Render)

1. Sign up on [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Configure the settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `PORT`: (Optional, Render assigns one automatically)
6. Click **Deploy Web Service**.
