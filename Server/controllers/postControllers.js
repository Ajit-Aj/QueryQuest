import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";
// import upload from "../middleware/multerConfig.js";

// Create a new post
// const createPost = asyncHandler(async (req, res) => {
//   console.log(req.body);
//   const { content, image } = req.body;
//   const user = req.user._id;

//   const post = new Post({
//     user,
//     content,
//   });
//   const createdPost = await post.save();
//   const userProfile = await User.findById(user);
//   userProfile.posts.push(createdPost._id);
//   await userProfile.save();
//   res.status(201).json(createdPost);
// });

// Create a new post
const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body; // Extract content from the request body
  const user = req.user._id; // Get user ID from the authenticated user

  // Check if an image file is uploaded
  let imageUrl = null;
  if (req.file) {
    imageUrl = req.file.path; // Store the file path of the uploaded image
  }

  // Create a new post object
  const post = new Post({
    user,
    content,
    image: imageUrl, // Save the image URL in the post
  });

  // Save the post to the database
  const createdPost = await post.save();

  // Update the user's profile with the new post ID
  const userProfile = await User.findById(user);
  userProfile.posts.push(createdPost._id);
  await userProfile.save();

  // Send a response with the created post
  res.status(201).json(createdPost);
});

// // Create a new post with image upload
// const createPost = asyncHandler(async (req, res) => {
//   console.log(req.body);

//   upload(req, res, async (err) => {
//     if (err) {
//       res.status(400).json({ message: err });
//       return;
//     }

//     const { content } = req.body;
//     const user = req.user._id;
//     let imagePath = "";

//     if (req.file) {
//       imagePath = req.file.path; // Save the file path in the database
//     }

//     const post = new Post({
//       user,
//       content,
//       image: imagePath,
//     });

//     const createdPost = await post.save();
//     const userProfile = await User.findById(user);
//     userProfile.posts.push(createdPost._id);
//     await userProfile.save();

//     res.status(201).json(createdPost);
//   });
// });

// Upvote a post
const upvotePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  // Check if the user has already upvoted the post
  const userIndex = post.upvotes.indexOf(req.user._id);

  if (userIndex !== -1) {
    // User has already upvoted, so undo the upvote
    post.upvotes.splice(userIndex, 1);
    res.json({ message: "Upvote removed", post });
  } else {
    // User hasn't upvoted yet, so add the upvote
    post.upvotes.push(req.user._id);
    res.json({ message: "Post upvoted", post });
  }

  await post.save();
});

// Downvote a post
const downvotePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  // Check if the user has already downvoted the post
  const userIndex = post.downvotes.indexOf(req.user._id);

  if (userIndex !== -1) {
    // User has already downvoted, so undo the downvote
    post.downvotes.splice(userIndex, 1);
    res.json({ message: "Downvote removed", post });
  } else {
    // User hasn't downvoted yet, so add the downvote
    post.downvotes.push(req.user._id);
    res.json({ message: "Post downvoted", post });
  }

  await post.save();
});

// Get all posts
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("user", "name")
    .populate("comments.user", "name")
    .populate("comments.replies.user", "name");
  res.json(posts);
});

// Get post by ID
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "name")
    .populate("comments.user", "name");

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  res.json(post);
});

// Get posts by user ID
const getPostsByUserId = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .populate("user", "name")
    .populate("comments.user", "name");

  if (posts.length === 0) {
    res.status(404).json({ message: "No posts found for this user" });
    return;
  }

  res.json(posts);
});

export {
  createPost,
  upvotePost,
  downvotePost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
};
