import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  replyToComment,
  upvoteComment,
  downvoteComment,
  deleteComment,
  downvoteReply,
  upvoteReply,
  deleteReply,
} from "../controllers/commentControllers.js";

const router = express.Router();

// Add a comment to a post
router.post("/:id", protect, addComment);

// Upvote a comment on a post
router.post("/:postId/upvote/:commentId", protect, upvoteComment);

// Downvote a comment on a post
router.post("/:postId/downvote/:commentId", protect, downvoteComment);

// Delete a comment on a post
router.delete("/:postId/comments/:commentId", protect, deleteComment);

// Reply to a comment on a post
router.post("/:postId/replies/:commentId", protect, replyToComment);

// Upvote a reply to a comment
router.post(
  "/:postId/comments/:commentId/replies/:replyId/upvote",
  protect,
  upvoteReply
);

// Downvote a reply to a comment
router.post(
  "/:postId/comments/:commentId/replies/:replyId/downvote",
  protect,
  downvoteReply
);

// Delete a reply to a comment
router.delete(
  "/:postId/comments/:commentId/replies/:replyId",
  protect,
  deleteReply
);

export default router;
