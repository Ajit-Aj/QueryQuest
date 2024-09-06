import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

// Add a comment to a post
const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  const comment = {
    user: req.user._id,
    content,
  };
  post.comments.push(comment);
  await post.save();
  res.json(post);
});

// Upvote a comment
const upvoteComment = asyncHandler(async (req, res) => {
  console.log(req.params);

  const { postId, commentId } = req.params;
  const userId = req.user._id;

  // Find the post
  const post = await Post.findById(postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  // Find the comment
  const comment = post.comments.id(commentId);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  // Check if the user has already upvoted the comment
  const hasUpvoted = comment.upvotes.includes(userId);

  if (hasUpvoted) {
    // Undo the upvote
    comment.upvotes = comment.upvotes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    // Add the upvote
    comment.upvotes.push(userId);
  }

  // Save the post with the updated comment
  await post.save();

  // Respond with the updated comment
  res.json(comment);
});

// Downvote a comment
const downvoteComment = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user._id;

  // Find the post
  const post = await Post.findById(postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  // Find the comment
  const comment = post.comments.id(commentId);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  // Check if the user has already downvoted the comment
  const hasDownvoted = comment.downvotes.includes(userId);

  if (hasDownvoted) {
    // Undo the downvote
    comment.downvotes = comment.downvotes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    // Add the downvote
    comment.downvotes.push(userId);
  }

  // Save the post with the updated comment
  await post.save();

  // Respond with the updated comment
  res.json(comment);
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  console.log(req.params);

  const { postId, commentId } = req.params;
  const post = await Post.findById(postId);

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const comment = post.comments.id(commentId);

  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  // Check if the user is the post owner or the comment owner
  if (
    comment.user.toString() !== req.user._id.toString() &&
    post.user.toString() !== req.user._id.toString()
  ) {
    res
      .status(403)
      .json({ message: "You do not have permission to delete this comment" });
    return;
  }

  // Remove the comment by filtering it out
  post.comments = post.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );

  await post.save();

  res.json({ message: "Comment deleted successfully" });
});

// Reply to a comment
const replyToComment = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request params:", req.params);

  const { postId, commentId } = req.params; // Ensure these names match the route definition
  const { content } = req.body;

  console.log("Looking for post with ID:", postId);

  const post = await Post.findById(postId);

  if (!post) {
    console.log("Post not found with ID:", postId);
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const comment = post.comments.id(commentId);

  if (!comment) {
    console.log("Comment not found with ID:", commentId);
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  const reply = {
    user: req.user._id,
    content,
    createdAt: Date.now(),
  };

  comment.replies.push(reply);
  await post.save();
  res.json(comment);
});

// Upvote a replycomment
const upvoteReply = asyncHandler(async (req, res) => {
  const { postId, commentId, replyId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  const reply = comment.replies.id(replyId);
  if (!reply) {
    res.status(404).json({ message: "Reply not found" });
    return;
  }

  const hasUpvoted = reply.upvotes.includes(userId);
  if (hasUpvoted) {
    reply.upvotes = reply.upvotes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    reply.upvotes.push(userId);
  }

  await post.save();
  res.json(reply);
});

// Upvote a replycomment
const downvoteReply = asyncHandler(async (req, res) => {
  const { postId, commentId, replyId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  const reply = comment.replies.id(replyId);
  if (!reply) {
    res.status(404).json({ message: "Reply not found" });
    return;
  }

  const hasDownvoted = reply.downvotes.includes(userId);
  if (hasDownvoted) {
    reply.downvotes = reply.downvotes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    reply.downvotes.push(userId);
  }

  await post.save();
  res.json(reply);
});

// Delete a reply comment
const deleteReply = asyncHandler(async (req, res) => {
  const { postId, commentId, replyId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const comment = post.comments.id(commentId);
  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  const reply = comment.replies.id(replyId);
  if (!reply) {
    res.status(404).json({ message: "Reply not found" });
    return;
  }

  // Check if the user is the reply owner or the post/comment owner
  if (
    reply.user.toString() !== req.user._id.toString() &&
    post.user.toString() !== req.user._id.toString() &&
    comment.user.toString() !== req.user._id.toString()
  ) {
    res
      .status(403)
      .json({ message: "You do not have permission to delete this reply" });
    return;
  }

  // Remove the reply
  comment.replies = comment.replies.filter(
    (reply) => reply._id.toString() !== replyId.toString()
  );

  await post.save();
  res.json({ message: "Reply deleted successfully" });
});

export {
  addComment,
  upvoteComment,
  downvoteComment,
  deleteComment,
  replyToComment,
  upvoteReply,
  downvoteReply,
  deleteReply,
};
