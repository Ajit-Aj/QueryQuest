import User from "../models/User.js";

// Follow or Unfollow user
export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      // User is already following, so we unfollow
      currentUser.following = currentUser.following.filter(
        (userId) => userId.toString() !== userToFollow._id.toString()
      );
      userToFollow.followers = userToFollow.followers.filter(
        (userId) => userId.toString() !== currentUser._id.toString()
      );

      await currentUser.save();
      await userToFollow.save();

      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // User is not following, so we follow
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);

      await currentUser.save();
      await userToFollow.save();

      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch User by ID with Question Count
export const getUserById = async (req, res) => {
  console.log(req.params);

  try {
    const userId = req.params.id;

    // Aggregate to count questions for a specific user by ID
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId), // Match the user by ID
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

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user[0]); // Return the first (and only) result
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
