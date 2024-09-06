import asyncHandler from 'express-async-handler';
import Question from '../models/Question.js';

// Create a new question
export const createQuestion = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const question = await Question.create({
    user: req.user._id,
    title,
    content,
  });

  res.status(201).json(question);
});

// Get all questions
export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().populate('user', 'name');
  res.json(questions);
});

// Get a question by ID
export const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
    .populate('user', 'name')
    .populate('answers.user', 'name');

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
});

// Upvote a question
export const upvoteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    if (!question.upvotes.includes(req.user._id)) {
      question.upvotes.push(req.user._id);
      question.downvotes = question.downvotes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
      await question.save();
      res.json({ message: 'Question upvoted' });
    } else {
      res.status(400);
      throw new Error('Already upvoted');
    }
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
});

// Downvote a question
export const downvoteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    if (!question.downvotes.includes(req.user._id)) {
      question.downvotes.push(req.user._id);
      question.upvotes = question.upvotes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
      await question.save();
      res.json({ message: 'Question downvoted' });
    } else {
      res.status(400);
      throw new Error('Already downvoted');
    }
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
});

// Add an answer to a question
export const addAnswer = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const question = await Question.findById(req.params.questionId);

  if (question) {
    const answer = {
      user: req.user._id,
      content,
    };

    question.answers.push(answer);
    await question.save();

    res.status(201).json(answer);
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
});

// Upvote an answer
export const upvoteAnswer = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  const answer = question.answers.id(req.params.answerId);

  if (answer) {
    if (!answer.upvotes.includes(req.user._id)) {
      answer.upvotes.push(req.user._id);
      answer.downvotes = answer.downvotes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
      await question.save();
      res.json({ message: 'Answer upvoted' });
    } else {
      res.status(400);
      throw new Error('Already upvoted');
    }
  } else {
    res.status(404);
    throw new Error('Answer not found');
  }
});

// Downvote an answer
export const downvoteAnswer = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  const answer = question.answers.id(req.params.answerId);

  if (answer) {
    if (!answer.downvotes.includes(req.user._id)) {
      answer.downvotes.push(req.user._id);
      answer.upvotes = answer.upvotes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
      await question.save();
      res.json({ message: 'Answer downvoted' });
    } else {
      res.status(400);
      throw new Error('Already downvoted');
    }
  } else {
    res.status(404);
    throw new Error('Answer not found');
  }
});
