const { GoogleGenerativeAI } = require('@google/generative-ai');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function summarizer(article) {
  // https://ai.google.dev/tutorials/node_quickstart?hl=zh-cn#control-content-generation
  const model = genAI.getGenerativeModel({
    model: 'gemini-pro',
    generationConfig: {
      temperature: 0.5
    }
  });

  const prompt = `Summarize the following markdown in Chinese. Try to use your own words when possible. Keep your answer under 5 sentences, remove any unnecessary information, whitespace.
  
  ${article}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}

module.exports = summarizer;
