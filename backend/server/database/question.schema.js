import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    index: true 
  }, // e.g., frontend, backend, fullstack, pm, datascience
  keyPoints: { 
    type: [String], 
    required: true 
  },
  difficulty: { 
    type: String, 
    default: 'Medium' 
  }
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
