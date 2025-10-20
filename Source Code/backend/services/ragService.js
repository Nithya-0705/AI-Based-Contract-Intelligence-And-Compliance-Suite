
const db = require('../db'); // adjust path if needed

async function searchSimilarChunks(queryEmbedding, topK = 5, documentId) {
  if (!queryEmbedding) {
    throw new Error("❌ queryEmbedding is undefined. Make sure you're passing a valid embedding.");
  }

  // Handle both array and string cases
  const embeddingStr = Array.isArray(queryEmbedding)
    ? `[${queryEmbedding.join(',')}]`
    : queryEmbedding.toString(); // fallback if it's already a pgvector string

  const params = documentId ? [embeddingStr, documentId, topK] : [embeddingStr, topK];

  const sql = `
    SELECT id, "documentId", content, embedding <=> $1 AS similarity
    FROM "DocumentChunk"
    ${documentId ? 'WHERE "documentId" = $2' : ''}
    ORDER BY similarity ASC
    LIMIT $${documentId ? 3 : 2};
  `;

  const { rows } = await db.query(sql, params);
  return rows;
}

module.exports = { searchSimilarChunks };
