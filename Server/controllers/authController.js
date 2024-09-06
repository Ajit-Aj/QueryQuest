import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import upload from "../middleware/uploadMiddleware.js";
import {
  verifyEmailTemplate,
  resetEmailTemplate,
} from "../emails/templates/verifyEmailTemplate.js";
import sendEmail from "../utils/emailService.js";
import {
  generateOTP,
  generateResetToken,
  generateToken,
} from "../utils/generateFunctions.js";

import mongoose from "mongoose";

// import{ upload} from "../middleware/uploadMiddleware.js"

// import User from "../models/userModel.js";
import Question from "../models/Question.js";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const otp = generateOTP();
  const otpCreatedAt = new Date();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check for existing user by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      if (!existingUserByEmail.isVerified) {
        existingUserByEmail.otp = otp;
        existingUserByEmail.otpCreatedAt = otpCreatedAt;
        await existingUserByEmail.save();
        await sendEmail(
          existingUserByEmail.email,
          "Email verification",
          verifyEmailTemplate(otp, name)
        );
        return res.json({
          message: `OTP resent to email ${existingUserByEmail.email}`,
        });
      } else {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    // Check for existing user by phone number
    const existingUserByPhone = await User.findOne({ phone });
    if (existingUserByPhone) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpCreatedAt,
      role,
      profileImage: req.file ? `/uploads/${req.file.filename}` : "",
    });
    await sendEmail(
      newUser.email,
      "Email verification",
      verifyEmailTemplate(otp, name)
    );
    res.json({ message: `OTP sent to email ${newUser.email}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// });

// Update Profile Picture
// const updateProfilePicture = asyncHandler(async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: err });
//     }

//     try {
//       const user = await User.findById(req.user._id);

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       user.profileImage = req.file ? `/uploads/${req.file.filename}` : '';
//       await user.save();

//       res.json({ message: "Profile picture updated successfully", profileImage: user.profileImage });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });
// });


// // Delete Profile Picture
// const deleteProfilePicture = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.profileImage = '';
//     await user.save();

//     res.json({ message: "Profile picture deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Fetch All Users
// const getAllUsers = asyncHandler(async (req, res) => {
//   try {
//     const users = await User.find(
//       {},
//       "-password -otp -resetToken -resetTokenExpiration"
//     );
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Fetch All Users with Question Count
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Aggregate to count questions per user
    const users = await User.aggregate([
      {
        $lookup: {
          from: "questions", // Collection name of questions
          localField: "_id",
          foreignField: "user",
          as: "questions",
        },
      },
      {
        $lookup: {
          from: "users", 
          localField: "followers", 
          foreignField: "_id",
          as: "followingDetails", 
        },
      },
      // {
      //   $lookup: {
      //     from: "users", // Collection name of users
      //     localField: "following", // Field in the user document
      //     foreignField: "_id", // Field in the users collection
      //     as: "followingDetails", // Name for the joined data
      //   },
      // },
      {
        $addFields: {
          questionCount: { $size: "$questions" }, // Add questionCount field
        },
      },
      {
        $project: {
          password: 0,
          otp: 0,
          resetToken: 0,
          resetTokenExpiration: 0,
          questions: 0, // Optionally exclude the detailed questions array
        },
      },
    ]);

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch User by ID with Question Count
const getUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId), 
        },
      },
      {
        $lookup: {
          from: "users", // Collection name of users
          localField: "following", // Field in the user document
          foreignField: "_id", // Field in the users collection
          as: "followingDetails", // Name for the joined data
        },
      },
      {
        $lookup: {
          from: "questions", // Collection name of questions
          localField: "_id",
          foreignField: "user",
          as: "questions",
        },
      },
      {
        $lookup: {
          from: "users", // Collection name of users
          localField: "following", // Field in the user document
          foreignField: "_id", // Field in the users collection
          as: "followingDetails", // Name for the joined data
        },
      },
      {
        $lookup: {
          from: "users", // Collection name of users
          localField: "followers", // Field in the user document
          foreignField: "_id", // Field in the users collection
          as: "followerDetails", // Name for the joined data
        },
      },
      {
        $addFields: {
          questionCount: { $size: "$questions" }, // Add questionCount field
        },
      },
      {
        $project: {
          password: 0,
          otp: 0,
          resetToken: 0,
          resetTokenExpiration: 0,
          questions: 0, // Optionally exclude the detailed questions array
          "followingDetails.password": 0, // Exclude password from following users
          "followingDetails.otp": 0, // Exclude other sensitive fields if needed
        },
      },
    ]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract only the names of the following users
    user[0].followingNames = user[0].followingDetails.map(
      (followingUser) => followingUser.name
    );

    res.json(user[0]); // Return the first (and only) result
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify OTP
const verifyOTP = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpAgeInSeconds = (new Date() - user.otpCreatedAt) / 1000;
    if (otpAgeInSeconds > 60) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otp = null;
    user.otpCreatedAt = null;
    user.isVerified = true;
    await user.save();

    const token = generateToken(user._id, user.role);
    res.json({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Sign In
const signin = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists and is verified
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "User not registered or not verified" });
    }

    // Check if the user is active
    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Account is disabled. Please contact support." });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Generate the token and send the response
    const token = generateToken(user._id, user.role, user.name);
    res.json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();
    const resetURL = `${
      process.env.CLIENT_URL || "http://localhost:5173"
    }/resetpassword/${resetToken}`;
    await sendEmail(
      user.email,
      "Password Reset",
      resetEmailTemplate(user, resetURL)
    );
    res.json({ message: "Password reset link sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Resend OTP
const resendOTP = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }
    const otp = generateOTP();
    user.otp = otp;
    user.otpCreatedAt = new Date();
    await user.save();
    await sendEmail(
      user.email,
      "Email verification",
      verifyEmailTemplate(otp, user.name)
    );
    res.json({ message: `OTP resent to email ${user.email}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Profile
const getProfileById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // Find user by ID and exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Profile Picture
const updateProfilePicture = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.params);

  upload.single("profileImage")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: err.message || "File upload failed" });
    }

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.profileImage = req.file ? `/uploads/${req.file.filename}` : "";
      await user.save();

      res.json({
        message: "Profile picture updated successfully",
        profileImage: user.profileImage,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
});

// Delete Profile Picture
const deleteProfilePicture = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.profileImage = "";
    await user.save();
    res.json({ message: "Profile picture deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export {
  registerUser,
  verifyOTP,
  signin,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getProfileById,
  resendOTP,
  updateProfilePicture,
  deleteProfilePicture,
  getUserById,
};
