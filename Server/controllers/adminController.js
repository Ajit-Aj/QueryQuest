import User from "../models/User.js";
import Post from "../models/Post.js";
import Question from "../models/Question.js";
import Space from "../models/Space.js";

// to update user's active status
export const updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { isActive } = req.body;

    // Find the user by ID and update their active status
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `User status updated to ${isActive ? "active" : "inactive"}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  console.log("get user stst");
  
  try {
    const totalUsers = await User.countDocuments({});
    const totalPosts = await Post.countDocuments({});
    const totalQuestions = await Question.countDocuments({});
    const totalSpacesCreated = await Space.countDocuments({});

    const totalLikes = await Post.aggregate([
      { $unwind: "$upvotes" },
      { $count: "totalLikes" },
    ]);

    const totalDislikes = await Post.aggregate([
      { $unwind: "$downvotes" },
      { $count: "totalDislikes" },
    ]);

    const newUsersThisMonth = await User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setDate(1)),
      },
    });

    res.status(200).json({
      totalUsers,
      totalPosts,
      totalQuestions,
      totalSpacesCreated,
      totalLikes: totalLikes[0]?.totalLikes || 0,
      totalDislikes: totalDislikes[0]?.totalDislikes || 0,
      newUsersThisMonth,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving dashboard stats", error });
  }
};

// Delete a space
export const deleteSpace = async (req, res) => {
  try {
    console.log(req.params);
    
    const { spaceId } = req.params;

    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    await space.deleteOne();

    res.status(200).json({ message: "Space deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting space", error });
  }
};

// Get all spaces
export const getAllSpaces = async (req, res) => {
  try {
    const spaces = await Space.find({});
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving spaces", error });
  }
};
