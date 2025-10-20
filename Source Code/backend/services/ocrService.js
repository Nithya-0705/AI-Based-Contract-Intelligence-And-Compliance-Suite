const Tesseract = require('tesseract.js');
const fs = require('fs');

async function extractTextFromImage(filePath) {
  const result = await Tesseract.recognize(filePath, 'eng', {
    logger: m => console.log(m)
  });
  return result.data.text;
}

module.exports = { extractTextFromImage };
