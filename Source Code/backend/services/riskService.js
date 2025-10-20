const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function assessClauseRisk(clauseText, categories, retries = 3) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a legal risk assessor. Given this clause and its categories, rate:
- riskLevel: "High", "Medium", or "Low"
- riskScore: number between 0 and 100

Return only JSON like: {"riskLevel": "...", "riskScore": number}

Clause: """${clauseText}"""
Categories: ${JSON.stringify(categories)}
  `;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      if (match) text = match[0];
      return JSON.parse(text);
    } catch (err) {
      if (err.status === 503 && attempt < retries) {
        await new Promise(res => setTimeout(res, 1000 * Math.pow(2, attempt)));
        continue;
      }
      return { riskLevel: "Unknown", riskScore: 0 };
    }
  }
}

module.exports = { assessClauseRisk };
