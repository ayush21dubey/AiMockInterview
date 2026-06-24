import dotenv from 'dotenv';
dotenv.config();

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];

for (const envName of requiredEnv) {
  if (!process.env[envName]) {
    console.error(`Error: Missing required environment variable: ${envName}`);
    process.exit(1);
  }
}

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};

export default env;
