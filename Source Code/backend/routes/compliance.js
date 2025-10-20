// routes/compliance.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { assessDocumentCompliance } = require("../services/complianceService");

const prisma = new PrismaClient();
const router = express.Router();

// Run compliance check for a document
router.post("/:documentId/check", async (req, res) => {
  try {
    const { framework } = req.body;
    const { documentId } = req.params;

    if (!framework) return res.status(400).json({ error: "Framework is required" });

    // fetch document chunks
    const chunks = await prisma.documentChunk.findMany({
      where: { documentId: parseInt(documentId) },
      select: { content: true },
    });

    if (!chunks.length) {
      return res.status(404).json({ error: "No chunks found for this document" });
    }

    // run compliance
    const complianceResult = await assessDocumentCompliance(
      chunks.map((c) => c.content),
      framework
    );

    // save in DB
    const saved = await prisma.complianceCheck.create({
      data: {
        documentId: parseInt(documentId),
        framework,
        score: complianceResult.score,
        requirements: complianceResult.requirements,
        passed: complianceResult.passed.length,
        issues: complianceResult.issues,
        details: complianceResult,
      },
    });

    res.json(saved);
  } catch (err) {
    console.error("Compliance check failed:", err);
    res.status(500).json({ error: "Compliance check failed", details: err.message });
  }
});

// get compliance checks
// router.get("/", async (req, res) => {
//   try {
//     const checks = await prisma.complianceCheck.findMany({
//       orderBy: { createdAt: "desc" },
//     });
//     res.json(checks);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch compliance checks" });
//   }
// });

// get compliance checks
router.get("/", async (req, res) => {
  try {
    const checks = await prisma.complianceCheck.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        document: {   // ✅ include related document
          select: { id: true, filename: true },
        },
      },
    });

    //  Format response to include document name
    const formatted = checks.map((c) => ({
      id: c.id,
      documentId: c.documentId,
      documentName: c.document?.filename || "Unknown Document",
      framework: c.framework,
      score: c.score,
      requirements: c.requirements,
      passed: c.passed,
      issues: c.issues,
      details: c.details,
      createdAt: c.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch compliance checks" });
  }
});


module.exports = router;
