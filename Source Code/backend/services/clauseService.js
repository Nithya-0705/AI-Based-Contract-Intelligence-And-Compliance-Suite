


const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function classifyClause(clauseText, retries = 5) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `
    Classify this legal/document clause into one or more categories:
    ["Payment", "Termination", "Confidentiality", "Delivery", "Warranty", "Dispute Resolution", "Other"].
    Return ONLY a valid JSON: {"categories": [...], "confidence": 0.xx}

    Clause: "${clauseText}"
  `;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text();

      // Extract JSON from response safely
      const match = text.match(/\{[\s\S]*\}/);
      if (match) text = match[0];

      return JSON.parse(text);
    } catch (err) {
      // --- Handle Rate Limit (429) ---
      if (err.status === 429 && attempt < retries) {
        let wait = 2000 * Math.pow(2, attempt); // default exponential backoff
        const retryInfo = err.errorDetails?.find(e => e['@type']?.includes("RetryInfo"));
        if (retryInfo?.retryDelay) {
          const seconds = parseInt(retryInfo.retryDelay.replace("s", ""), 10);
          wait = seconds * 1000;
        }
        console.warn(`Rate limited (429). Retrying in ${wait / 1000}s...`);
        await new Promise(res => setTimeout(res, wait));
        continue;
      }

      // --- Handle Service Unavailable (503) ---
      if (err.status === 503 && attempt < retries) {
        const wait = 1000 * Math.pow(2, attempt);
        console.warn(`Gemini overloaded (503). Retrying in ${wait / 1000}s...`);
        await new Promise(res => setTimeout(res, wait));
        continue;
      }

      // --- Final Fallback ---
      console.error("Classification failed:", err.message || err);
      return { categories: ["Unclassified"], confidence: 0.0 };
    }
  }
}

module.exports = { classifyClause };
