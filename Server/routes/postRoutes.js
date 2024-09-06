// import express from 'express';
// import {
//   createPost,
//   upvotePost,
//   downvotePost,
//   getAllPosts,
//   getPostById,
//   getPostsByUserId,
// } from '../controllers/postControllers.js';
// import { protect } from '../middleware/authMiddleware.js';
// // import upload from '../middleware/multerConfig.js'; 

// const router = express.Router();

// router.post('/create-post', protect, createPost);
// router.post('/upvote/:id', protect, upvotePost);
// router.post('/downvote/:id', protect, downvotePost);
// router.get('/all', getAllPosts);
// router.get('/:id', getPostById);
// router.get('/user/:userId', getPostsByUserId);

// export default router;
















import express from 'express';
import {
  createPost,
  upvotePost,
  downvotePost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
} from '../controllers/postControllers.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerConfig.js';  // Import Multer

const router = express.Router();

// Use upload.single('image') to handle single image uploads
router.post('/create-post', protect, upload.single('image'), createPost);
router.post('/upvote/:id', protect, upvotePost);
router.post('/downvote/:id', protect, downvotePost);
router.get('/all', getAllPosts);
router.get('/:id', getPostById);
router.get('/user/:userId', getPostsByUserId);

export default router;

