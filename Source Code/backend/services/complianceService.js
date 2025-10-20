

// services/complianceService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Frameworks & requirements (simplified example)
const frameworks = {
  GDPR: [
    "Data Processing Agreement present",
    "Right to erasure included",
    "Cross-border transfer clause included",
    "Data breach notification clause included",
  ],
  HIPAA: [
    "Patient data confidentiality clause present",
    "Business Associate Agreement terms included",
    "Security safeguard obligations included",
  ],
  SOX: [
    "Financial reporting accuracy clause included",
    "Internal control responsibilities included",
  ],
  CCPA: [
    "Consumer rights disclosure included",
    "Opt-out clause for data selling included",
  ],
};

async function checkCompliance(clauseText, frameworkName, retries = 3) {
  const requirements = frameworks[frameworkName] || [];
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

  const prompt = `
You are a compliance auditor. Given this clause and compliance framework, check which requirements are satisfied.

Framework: ${frameworkName}
Requirements: ${requirements.join("\n")}
Clause: """${clauseText}"""

Return only JSON in this format:
{
  "passed": ["req1", "req2"],
  "failed": ["req3", "req4"]
}
`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      if (match) text = match[0];
      return JSON.parse(text);
    } catch (err) {
      console.error(`Attempt ${attempt} failed:`, err.message);
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, 1000 * Math.pow(2, attempt)));
        continue;
      }
      return { passed: [], failed: requirements };
    }
  }
}

// ✅ Now accepts documentName
async function assessDocumentCompliance(documentName, clauses, framework) {
  const requirements = frameworks[framework] || [];
  let passed = new Set();
  let failed = new Set(requirements);

  for (const clause of clauses) {
    const result = await checkCompliance(clause, framework);
    result.passed.forEach((r) => passed.add(r));
    result.failed.forEach((r) => failed.add(r));
  }

  const passedArr = Array.from(passed);
  const failedArr = requirements.filter((r) => !passedArr.includes(r));
  const score = Math.round((passedArr.length / requirements.length) * 100);

  return {
    document: documentName,  // ✅ Added document name
    framework,
    score,
    passed: passedArr,
    failed: failedArr,
    issues: failedArr.length,
    requirements: requirements.length,
  };
}

module.exports = { assessDocumentCompliance };
