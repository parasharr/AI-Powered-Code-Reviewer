const { GoogleGenAI } = require("@google/genai");
const path = require("path");
// Assuming debug_response.js is in backend/, and .env is also in backend/
require("dotenv").config();

async function check() {
  const key = process.env.GOOGLE_GEMINI_API;
  if (!key) {
    console.log("API Key missing!");
    return;
  }
  const genAI = new GoogleGenAI({ apiKey: key });

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [{ text: "Hi" }],
        },
      ],
    });
    console.log("Response Type:", typeof result);
    console.log("Response Keys:", Object.keys(result));
    console.log("Full Response:", JSON.stringify(result, null, 2));

    // Check for candidates
    if (result.candidates) {
      console.log("Candidates found.");
      if (result.candidates[0].content && result.candidates[0].content.parts) {
        console.log("Text:", result.candidates[0].content.parts[0].text);
      }
    }
  } catch (e) {
    console.log("Error:", e.message);
  }
}

check();
