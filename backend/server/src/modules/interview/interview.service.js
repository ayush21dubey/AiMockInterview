import Interview from '../../../database/interview.schema.js';
import User from '../../../database/user.schema.js';
import { groqService } from '../../services/groq.service.js';

export const interviewService = {
  createInterview: async (userId, { roleId, roleName, difficulty, questionsCount, mode }) => {
    const user = await User.findById(userId);
    const experience = user ? user.experience : 'Mid-level (3-5 years)';

    // Dynamic generation
    const questions = await groqService.generateQuestions(
      roleId,
      roleName,
      experience,
      difficulty,
      questionsCount
    );

    const interview = await Interview.create({
      userId,
      roleId,
      roleName,
      difficulty,
      mode,
      questionsCount,
      questions,
      answers: {},
      status: 'Created'
    });

    return interview;
  },

  startInterview: async (interviewId) => {
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      throw new Error('Interview session not found');
    }

    interview.status = 'In Progress';
    interview.startedAt = new Date();
    await interview.save();
    return interview;
  },

  saveAnswer: async (interviewId, { questionId, answer }) => {
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      throw new Error('Interview session not found');
    }

    // Set Map answer
    interview.answers.set(questionId, answer);
    await interview.save();
    return interview;
  },

  submitInterview: async (interviewId, { durationSeconds }) => {
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      throw new Error('Interview session not found');
    }

    // Convert Map to standard JS Object
    const answersObj = {};
    if (interview.answers) {
      for (const [key, value] of interview.answers.entries()) {
        answersObj[key] = value;
      }
    }

    // Evaluate
    const evaluation = await groqService.evaluateInterview(
      interview.roleName,
      interview.difficulty,
      interview.questions,
      answersObj
    );

    interview.durationSeconds = durationSeconds || 0;
    interview.score = evaluation.score || 0;
    interview.feedback = evaluation;
    interview.status = 'Completed';

    await interview.save();
    return interview;
  },

  getHistory: async (userId) => {
    const history = await Interview.find({ userId, status: 'Completed' }).sort({ createdAt: -1 });
    return history.map(r => ({
      _id: r._id,
      id: r._id,
      role: r.roleName,
      difficulty: r.difficulty,
      score: r.score,
      durationSeconds: r.durationSeconds,
      questionsCount: r.questionsCount,
      status: r.status,
      date: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      feedback: r.feedback
    }));
  },

  getInterviewById: async (interviewId) => {
    const r = await Interview.findById(interviewId);
    if (!r) return null;
    return {
      _id: r._id,
      id: r._id,
      role: r.roleName,
      difficulty: r.difficulty,
      score: r.score,
      durationSeconds: r.durationSeconds,
      questionsCount: r.questionsCount,
      status: r.status,
      date: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      feedback: r.feedback
    };
  },

  deleteInterview: async (interviewId) => {
    await Interview.findByIdAndDelete(interviewId);
    return { id: interviewId };
  }
};
