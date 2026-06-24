import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';
import Question from '../database/question.schema.js';
import { DEFAULT_QUESTIONS } from './utils/constants.js';
import logger from './utils/logger.js';

const startServer = async () => {
  // 1. Connect to MongoDB Atlas
  await connectDB();

  // 2. Auto-seed fallback questions if collection is empty
  try {
    const questionCount = await Question.countDocuments();
    if (questionCount === 0) {
      logger.info('Question collection is empty. Seeding default fallback questions...');
      await Question.insertMany(DEFAULT_QUESTIONS);
      logger.info(`Successfully seeded ${DEFAULT_QUESTIONS.length} fallback questions.`);
    } else {
      logger.info(`Database loaded with ${questionCount} fallback questions.`);
    }
  } catch (error) {
    logger.error('Failed to run question seeding:', error);
  }

  // 3. Bind port and start listener
  app.listen(env.PORT, () => {
    logger.info(`Server successfully started. Listening on port ${env.PORT}`);
  });
};

startServer();
