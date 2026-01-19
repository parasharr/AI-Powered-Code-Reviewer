const AIservice = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const response = await AIservice.generateContent(code);
    res.send(response);
  } catch (error) {
    console.error("AI Service Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
