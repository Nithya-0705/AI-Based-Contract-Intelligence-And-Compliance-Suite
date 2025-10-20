const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { searchSimilarChunks } = require("../services/ragService");
const { classifyClause } = require("../services/clauseService");
// const { generateEmbedding } = require("../services/embeddingService"); // ✅ import
const { generateLocalEmbedding } = require("../services/embeddingService");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { documentId1, documentId2, topK = 5 } = req.body;

    if (!documentId1 || !documentId2) {
      return res.status(400).json({ error: "Both documentId1 and documentId2 are required" });
    }

    // 🔹 Fetch chunks
    const doc1Chunks = await prisma.documentChunk.findMany({
      where: { documentId: documentId1 },
      select: { id: true, content: true }, // embedding removed
    });

    const doc2Chunks = await prisma.documentChunk.findMany({
      where: { documentId: documentId2 },
      select: { id: true, content: true }, // embedding removed
    });

    if (!doc1Chunks.length || !doc2Chunks.length) {
      return res.status(404).json({ error: "One or both documents have no chunks" });
    }

    // 🔹 Compare + classify
    const comparisons = [];
    for (const chunk of doc1Chunks) {
      // ✅ Generate embedding on the fly
      const embedding = await generateLocalEmbedding(chunk.content);

      // similarity search in doc2
      const similarInDoc2 = await searchSimilarChunks(embedding, topK, documentId2);

      // classification call (Gemini)
      const classification = await classifyClause(chunk.content);

      comparisons.push({
        clause: chunk.content,
        classification,
        matches: similarInDoc2.map((m) => ({
          content: m.content,
          similarity: 1 - m.similarity,
        })),
      });
    }

    res.json({ comparisons });
  } catch (err) {
    console.error("Comparison failed:", err);
    res.status(500).json({ error: "Failed to compare documents", details: err.message });
  }
});

module.exports = router;
