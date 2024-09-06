import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  upvoteQuestion,
  downvoteQuestion,
  addAnswer,
  upvoteAnswer,
  downvoteAnswer,
} from '../controllers/questionControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Question routes
router.post('/create', protect, createQuestion);
router.get('/all', getAllQuestions);
router.get('/:id', getQuestionById);
router.post('/upvote/:id', protect, upvoteQuestion);
router.post('/downvote/:id', protect, downvoteQuestion);

// Answer routes
router.post('/:questionId/answers', protect, addAnswer);
router.post('/:questionId/answers/:answerId/upvote', protect, upvoteAnswer);
router.post('/:questionId/answers/:answerId/downvote', protect, downvoteAnswer);

export default router;
