
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth');
// const { PrismaClient } = require('@prisma/client');

// const { extractTextFromImage } = require('../services/ocrService');
// const { splitIntoClauses } = require('../services/chunkService');
// const { generateEmbedding } = require('../services/embeddingService');
// const { classifyClause } = require('../services/clauseService');
// const { assessClauseRisk } = require('../services/riskService');

// const prisma = new PrismaClient();
// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

// // ✅ Utility: Safe file deletion
// const cleanupFile = (filePath) => {
//   try {
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   } catch (err) {
//     console.warn(`Failed to delete temp file: ${filePath}`, err);
//   }
// };

// // 📌 GET all documents
// router.get('/', async (req, res) => {
//   try {
//     const documents = await prisma.document.findMany({
//       select: { id: true, filename: true, uploaded_at: true },
//       orderBy: { uploaded_at: 'desc' },
//     });
//     res.json(documents);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch documents' });
//   }
// });

// // 📌 GET analyses overview
// router.get('/analyses', async (req, res) => {
//   try {
//     const documents = await prisma.document.findMany({
//       orderBy: { uploaded_at: 'desc' },
//     });

//     const result = documents.map((doc) => ({
//       id: doc.id,
//       document: doc.filename,
//       clauses: doc.clauses_count || 0,
//       categories: doc.categories || [],
//       confidence: doc.confidence ? Math.round(doc.confidence * 100) : null,
//       date: doc.uploaded_at.toISOString().split('T')[0],
//       status: doc.status || 'unknown',
//     }));

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch analyses' });
//   }
// });




// // 📌 POST upload & process document
// // router.post('/upload', upload.single('file'), async (req, res) => {
// //   const filePath = req.file.path;
// //   const fileType = path.extname(req.file.originalname).toLowerCase();
// //   let extractedText = '';

// //   try {
// //     // Step 1 — Extract text
// //     if (fileType === '.pdf') {
// //       const fileBuffer = fs.readFileSync(filePath);
// //       const pdfData = await pdfParse(fileBuffer);
// //       extractedText = pdfData.text.trim() || (await extractTextFromImage(filePath));
// //     } else if (fileType === '.docx') {
// //       const result = await mammoth.extractRawText({ path: filePath });
// //       extractedText = result.value;
// //     } else {
// //       return res.status(400).json({ error: 'Unsupported file format' });
// //     }

// //     if (!extractedText) throw new Error('No text could be extracted from the document.');

// //     // Step 2 — Split into clauses
// //     const clauses = splitIntoClauses(extractedText);

// //     // Step 3 — Process clauses with AI outside transaction
// //     const analysisResults = await Promise.all(
// //       clauses.map(async (clause) => {
// //         const classification = await classifyClause(clause);
// //         const risk = await assessClauseRisk(clause, classification.categories);
// //         const embedding = await generateEmbedding(clause);
// //         return {
// //           content: clause,
// //           categories: classification.categories,
// //           confidence: classification.confidence || 0,
// //           risk,
// //           embedding,
// //         };
// //       })
// //     );

// //     // Step 4 — Aggregate document stats
// //     const allCategories = [...new Set(analysisResults.flatMap((r) => r.categories))];
// //     const avgConfidence =
// //       analysisResults.reduce((sum, r) => sum + r.confidence, 0) / analysisResults.length;

// //     // Step 5a — Save document first
// //     const savedDoc = await prisma.document.create({
// //       data: {
// //         filename: req.file.originalname,
// //         clauses_count: clauses.length,
// //         categories: allCategories,
// //         confidence: avgConfidence,
// //         status: 'completed',
// //       },
// //     });

// //     // Step 5b — Insert chunks OUTSIDE transaction (no timeout risk)
// //     for (const r of analysisResults) {
// //       await prisma.$executeRawUnsafe(
// //         `INSERT INTO "DocumentChunk" ("documentId", "content", "embedding")
// //          VALUES ($1, $2, $3::vector)`,
// //         savedDoc.id,
// //         r.content,
// //         `[${r.embedding.join(',')}]`
// //       );
// //     }

// //     res.json({
// //       message: 'Document processed successfully',
// //       documentId: savedDoc.id,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Failed to process document', details: err.message });
// //   } finally {
// //     cleanupFile(filePath);
// //   }
// // });



// // 📌 POST upload & process document
// router.post('/upload', upload.single('file'), async (req, res) => {
//   const filePath = req.file.path;
//   const fileType = path.extname(req.file.originalname).toLowerCase();
//   let extractedText = '';

//   try {
//     // Step 1 — Extract text
//     if (fileType === '.pdf') {
//       const fileBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdfParse(fileBuffer);
//       extractedText = pdfData.text.trim() || (await extractTextFromImage(filePath));
//     } else if (fileType === '.docx') {
//       const result = await mammoth.extractRawText({ path: filePath });
//       extractedText = result.value;
//     } else {
//       return res.status(400).json({ error: 'Unsupported file format' });
//     }

//     if (!extractedText) throw new Error('No text could be extracted from the document.');

//     // Step 2 — Split into clauses
//     const clauses = splitIntoClauses(extractedText);

//     // Step 3 — Process clauses
//     const analysisResults = await Promise.all(
//       clauses.map(async (clause) => {
//         const classification = await classifyClause(clause);
//         const risk = await assessClauseRisk(clause, classification.categories);
//         const embedding = await generateEmbedding(clause);
//         return {
//           content: clause,
//           categories: classification.categories,
//           confidence: classification.confidence || 0,
//           risk,
//           embedding,
//         };
//       })
//     );

//     // Step 4 — Aggregate document stats
//     const allCategories = [...new Set(analysisResults.flatMap((r) => r.categories))];
//     const avgConfidence =
//       analysisResults.reduce((sum, r) => sum + r.confidence, 0) / analysisResults.length;

//     // Step 5a — Save document
//     const savedDoc = await prisma.document.create({
//       data: {
//         filename: req.file.originalname,
//         clauses_count: clauses.length,
//         categories: allCategories,
//         confidence: avgConfidence,
//         status: 'completed',
//       },
//     });

//     // Step 5b — Insert chunks
//     for (const r of analysisResults) {
//       await prisma.$executeRawUnsafe(
//         `INSERT INTO "DocumentChunk" ("documentId", "content", "embedding")
//          VALUES ($1, $2, $3::vector)`,
//         savedDoc.id,
//         r.content,
//         `[${r.embedding.join(',')}]`
//       );
//     }

 

//   // ✅ Step 6 — Auto-run compliance checks
// const { assessDocumentCompliance } = require('../services/complianceService');
// const chunks = analysisResults.map(r => r.content);

// const frameworks = ["GDPR", "SOX", "CCPA"]; // frameworks you want
// for (const framework of frameworks) {
//   const complianceResult = await assessDocumentCompliance(
//     req.file.originalname,   // ✅ Pass document name here
//     chunks,
//     framework
//   );

//   await prisma.complianceCheck.create({
//     data: {
//       documentId: savedDoc.id,
//       framework,
//       score: complianceResult.score,
//       requirements: complianceResult.requirements,
//       passed: complianceResult.passed.length,
//       issues: complianceResult.issues,
//       details: complianceResult,
//     },
//   });
// }

//     res.json({
//       message: 'Document processed and compliance checks completed',
//       documentId: savedDoc.id,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to process document', details: err.message });
//   } finally {
//     cleanupFile(filePath);
//   }

  
// });

// module.exports = router;



const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { PrismaClient } = require('@prisma/client');

const { extractTextFromImage } = require('../services/ocrService');
const { splitIntoClauses } = require('../services/chunkService');
const { classifyClause } = require('../services/clauseService');
const { assessClauseRisk } = require('../services/riskService');
const { assessDocumentCompliance } = require('../services/complianceService');

// REPLACE the Google embedding import with local embedding
const { generateLocalEmbeddingsBatch } = require('../services/embeddingService');

const prisma = new PrismaClient();
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ✅ Utility: Safe file deletion
const cleanupFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch (err) {
        console.warn(`Failed to delete temp file: ${filePath}`, err);
    }
};


router.get('/analyses', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { uploaded_at: 'desc' },
    });

    const result = documents.map((doc) => ({
      id: doc.id,
      document: doc.filename,
      clauses: doc.clauses_count || 0,
      categories: doc.categories || [],
      confidence: doc.confidence ? Math.round(doc.confidence * 100) : null,
      date: doc.uploaded_at.toISOString().split('T')[0],
      status: doc.status || 'unknown',
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});



// 📌 GET all documents
router.get('/', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      select: { id: true, filename: true, uploaded_at: true },
      orderBy: { uploaded_at: 'desc' },
    });
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});
// 📌 POST upload & process document (UPDATED)
router.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();
    let extractedText = '';

    try {
        // Step 1 — Extract text
        if (fileType === '.pdf') {
            const fileBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(fileBuffer);
            extractedText = pdfData.text.trim() || (await extractTextFromImage(filePath));
        } else if (fileType === '.docx') {
            const result = await mammoth.extractRawText({ path: filePath });
            extractedText = result.value;
        } else {
            return res.status(400).json({ error: 'Unsupported file format' });
        }

        if (!extractedText) {
            throw new Error('No text could be extracted from the document.');
        }

        // Step 2 — Split into clauses
        const clauses = splitIntoClauses(extractedText);
        console.log(`📄 Extracted ${clauses.length} clauses from document`);

        // Step 3 — Generate ALL embeddings locally at once (NO API CALLS!)
        console.log('🧠 Generating embeddings locally...');
        const allEmbeddings = await generateLocalEmbeddingsBatch(clauses);
        
        if (allEmbeddings.length !== clauses.length) {
            throw new Error('Embedding generation failed: mismatch in count');
        }

        // Step 4 — Process classifications and risks
        console.log('🏷️ Classifying clauses and assessing risks...');
        const analysisResults = [];
        
        for (let i = 0; i < clauses.length; i++) {
            const clause = clauses[i];
            const classification = await classifyClause(clause);
            const risk = await assessClauseRisk(clause, classification.categories);
            
            analysisResults.push({
                content: clause,
                categories: classification.categories,
                confidence: classification.confidence || 0,
                risk,
                embedding: allEmbeddings[i],
            });
        }

        // Step 5 — Aggregate document stats
        const allCategories = [...new Set(analysisResults.flatMap(r => r.categories))];
        const avgConfidence = analysisResults.reduce((sum, r) => sum + r.confidence, 0) / analysisResults.length;

        // Step 6 — Save document
        const savedDoc = await prisma.document.create({
            data: {
                filename: req.file.originalname,
                clauses_count: clauses.length,
                categories: allCategories,
                confidence: avgConfidence,
                status: 'completed',
            },
        });

        // Step 7 — Insert chunks with local embeddings
        console.log('💾 Saving chunks to database...');
        for (const result of analysisResults) {
            await prisma.$executeRawUnsafe(
                `INSERT INTO "DocumentChunk" ("documentId", "content", "embedding")
                 VALUES ($1, $2, $3::vector)`,
                savedDoc.id,
                result.content,
                `[${result.embedding.join(',')}]`
            );
        }

        // Step 8 — Auto-run compliance checks
        console.log('⚖️ Running compliance checks...');
        const frameworks = ["GDPR", "SOX", "CCPA"];
        const chunkContents = analysisResults.map(r => r.content);
        
        for (const framework of frameworks) {
            const complianceResult = await assessDocumentCompliance(
                req.file.originalname,
                chunkContents,
                framework
            );

            await prisma.complianceCheck.create({
                data: {
                    documentId: savedDoc.id,
                    framework,
                    score: complianceResult.score,
                    requirements: complianceResult.requirements,
                    passed: complianceResult.passed.length,
                    issues: complianceResult.issues,
                    details: complianceResult,
                },
            });
        }

        res.json({
            message: 'Document processed and compliance checks completed locally',
            documentId: savedDoc.id,
            clausesProcessed: clauses.length,
            embeddingsGenerated: allEmbeddings.length,
        });

    } catch (err) {
        console.error('❌ Document processing failed:', err);
        res.status(500).json({ 
            error: 'Failed to process document', 
            details: err.message 
        });
    } finally {
        cleanupFile(filePath);
    }
});

module.exports = router;