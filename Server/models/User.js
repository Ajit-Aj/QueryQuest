import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email format is invalid"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    otp: String,
    otpCreatedAt: Date,
    resetToken: String,
    resetTokenExpiration: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    profileImage: {
      type: String,
      default: "uploads/1725713939124.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    spacesCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
      },
    ],
    spacesJoined: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to count the number of questions a user has posted
userSchema.virtual("questionCount", {
  ref: "Question",
  localField: "_id",
  foreignField: "user",
  count: true,
});

// Ensure virtual fields are included when converting to JSON or Object
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
