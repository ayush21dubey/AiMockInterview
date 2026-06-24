import express from 'express';
import { 
  createInterview, 
  startInterview, 
  saveAnswer, 
  submitInterview, 
  getHistory, 
  getInterviewById, 
  deleteInterview 
} from './interview.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Apply JWT protection for all interview routes
router.use(protect);

router.post('/create', createInterview);
router.post('/:id/start', startInterview);
router.post('/:id/answer', saveAnswer);
router.post('/:id/submit', submitInterview);
router.get('/history', getHistory);
router.get('/:id', getInterviewById);
router.delete('/:id', deleteInterview);

export default router;
