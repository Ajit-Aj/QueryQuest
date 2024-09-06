import mongoose from "mongoose";

// Define the admin schema
const adminSchema = new mongoose.Schema(
  {
    totalUsers: {
      type: Number,
      default: 0,
    },
    totalPosts: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalDislikes: {
      type: Number,
      default: 0,
    },
    newlyJoinedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    postsToday: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    questionsToday: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    recentLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    recentDislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtuals to automatically update counts based on related collections
adminSchema.virtual("userCount").get(function () {
  return this.totalUsers;
});

adminSchema.virtual("postCount").get(function () {
  return this.totalPosts;
});

adminSchema.virtual("questionCount").get(function () {
  return this.totalQuestions;
});

adminSchema.virtual("likeCount").get(function () {
  return this.totalLikes;
});

adminSchema.virtual("dislikeCount").get(function () {
  return this.totalDislikes;
});

// Ensure virtual fields are included when converting to JSON or Object
adminSchema.set("toObject", { virtuals: true });
adminSchema.set("toJSON", { virtuals: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
