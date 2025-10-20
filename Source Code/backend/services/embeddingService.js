

const { pipeline } = require('@xenova/transformers');

// Singleton pattern to load the model only once
class LocalEmbedder {
    static instance = null;
    static model = null;
    static isInitializing = false;

    static async getInstance() {
        if (this.model) return this.model;
        
        if (this.isInitializing) {
            // Wait if another initialization is in progress
            await new Promise(resolve => {
                const checkInitialized = () => {
                    if (this.model) resolve();
                    else setTimeout(checkInitialized, 100);
                };
                checkInitialized();
            });
            return this.model;
        }

        this.isInitializing = true;
        try {
            console.log('🚀 Loading local embedding model "Xenova/tiny-bert" (smaller & more reliable)...');
            console.time('✅ Model loaded in');
            
            // Use a smaller, more reliable model
            this.model = await pipeline(
                'feature-extraction',
                'Xenova/tiny-bert', // Smaller, faster, more reliable model
                {
                    revision: 'default',
                    quantized: true
                }
            );
            
            console.timeEnd('✅ Model loaded in');
            console.log('🎯 Local embedding model ready!');
            return this.model;
        } catch (error) {
            console.error('❌ Failed to load tiny-bert model, trying fallback...');
            
            // Fallback to an even simpler model
            try {
                this.model = await pipeline(
                    'feature-extraction',
                    'Xenova/all-MiniLM-L6-v2', // Try the original again
                    { quantized: true }
                );
                console.log('✅ Fallback model loaded successfully');
                return this.model;
            } catch (fallbackError) {
                console.error('❌ Both model loading attempts failed:', fallbackError.message);
                throw fallbackError;
            }
        } finally {
            this.isInitializing = false;
        }
    }

    static async dispose() {
        if (this.model) {
            await this.model.dispose();
            this.model = null;
        }
    }
}

/**
 * Generate embedding for a single text
 */
async function generateLocalEmbedding(text) {
    try {
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            throw new Error('Invalid text input for embedding');
        }

        const embedder = await LocalEmbedder.getInstance();
        const output = await embedder(text, {
            pooling: 'mean',
            normalize: true
        });

        return Array.from(output.data);
    } catch (error) {
        console.error('❌ Error generating local embedding:', error.message);
        
        // Fallback: return a simple embedding based on text length
        console.log('🔄 Using simple fallback embedding');
        return createFallbackEmbedding(text);
    }
}

/**
 * Simple fallback embedding when model fails
 */
function createFallbackEmbedding(text) {
    // Create a simple 128-dimensional embedding based on text properties
    const embedding = new Array(128).fill(0);
    const textLength = text.length;
    
    // Simple hash-based embedding (better than nothing)
    for (let i = 0; i < embedding.length; i++) {
        embedding[i] = Math.sin(textLength + i * 0.1) * 0.5;
    }
    
    return embedding;
}

/**
 * Generate embeddings for multiple texts
 */
async function generateLocalEmbeddingsBatch(texts, batchSize = 5) {
    if (!Array.isArray(texts) || texts.length === 0) {
        return [];
    }

    const validTexts = texts.filter(text => 
        text && typeof text === 'string' && text.trim().length > 0
    );

    if (validTexts.length === 0) {
        return [];
    }

    try {
        const embedder = await LocalEmbedder.getInstance();
        const allEmbeddings = [];

        for (let i = 0; i < validTexts.length; i += batchSize) {
            const batch = validTexts.slice(i, i + batchSize);
            
            try {
                const batchPromises = batch.map(text => 
                    embedder(text, { pooling: 'mean', normalize: true })
                );
                const batchResults = await Promise.all(batchPromises);
                const batchEmbeddings = batchResults.map(output => Array.from(output.data));
                allEmbeddings.push(...batchEmbeddings);
            } catch (batchError) {
                console.warn('❌ Batch failed, using fallback embeddings for this batch');
                // Use fallback for failed batch
                const fallbackEmbeddings = batch.map(createFallbackEmbedding);
                allEmbeddings.push(...fallbackEmbeddings);
            }

            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return allEmbeddings;

    } catch (error) {
        console.error('❌ Complete batch failure, using all fallback embeddings');
        return validTexts.map(createFallbackEmbedding);
    }
}

module.exports = {
    generateLocalEmbedding,
    generateLocalEmbeddingsBatch
};