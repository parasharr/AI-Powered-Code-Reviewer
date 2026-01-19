const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API });

async function generateContent(code) {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [{ text: code }],
        },
      ],
      config: {
        systemInstruction: `
You are a senior software engineer with 7+ years of experience acting as a strict code reviewer.

Review the provided code for:
- Bugs
- Security issues
- Performance problems
- Code quality and best practices
- Scalability concerns

Rules:
- Be concise but precise
- Suggest concrete improvements
- Do not rewrite everything unless necessary
- Use markdown formatting
- Categorize findings (Bug, Security, Performance, Style)
`,
      },
    });

    // The new SDK response structure might need .text() or similar access
    // Based on common patterns in this SDK, it is likely result.text() or result.response.text()
    // Let's assume result.text() for the top level helper or look at the object
    // If it returns a GenerateContentResponse, we usually access candidates or use a helper.
    // However, for the @google/genai SDK (Vertex AI/Gemini 1.5 style), it is often result.text() directly available on the response helper.

    // Extract text from the response safely
    if (
      result.candidates &&
      result.candidates[0] &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts[0]
    ) {
      return result.candidates[0].content.parts[0].text;
    }
    return "No response text generated.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

module.exports = { generateContent };
