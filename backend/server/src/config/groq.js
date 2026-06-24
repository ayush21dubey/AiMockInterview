import env from './env.js';

export const groqConfig = {
  apiKey: env.GROQ_API_KEY,
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  model: 'llama-3.3-70b-versatile'
};

export default groqConfig;
