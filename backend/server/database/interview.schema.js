import mongoose from 'mongoose';

const interviewQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  keyPoints: { type: [String], required: true }
});

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  roleId: {
    type: String,
    required: true
  },
  roleName: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  mode: {
    type: String,
    required: true,
    enum: ['voice', 'text']
  },
  questionsCount: {
    type: Number,
    required: true
  },
  questions: [interviewQuestionSchema],
  answers: {
    type: Map,
    of: String,
    default: {}
  },
  durationSeconds: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Created', 'In Progress', 'Completed', 'Abandoned'],
    default: 'Created'
  },
  feedback: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  startedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
