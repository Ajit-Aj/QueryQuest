import express from "express";
import {
  verifyOTP,
  registerUser,
  signin,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateProfilePicture,
  deleteProfilePicture,
  resendOTP,
  getProfileById,
  getUserById

} from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Fetch all users - protected and admin-only route
router.get("/users", protect, admin, getAllUsers);
// router.get("/users", getAllUsers);

// Fetch all users By Id
router.get("/usersById/:id", getUserById);

// // Update and delete profile picture
// router.put("/profile-picture", protect, upload.single('profileImage'), updateProfilePicture);
// router.delete("/profile-picture", protect, deleteProfilePicture);

// Get Profile by ID
router.get("/profile/:id", getProfileById);

// Update Profile Picture
router.put("/update-profile-picture/:id", updateProfilePicture);

// Delete Profile Picture
router.delete("/delete-profile-picture/:id", deleteProfilePicture);

// Example of protected routes
router.get("/admin-route", protect, admin, (req, res) => {
  res.json({ message: "Admin access" });
});

router.get("/user-route", protect, (req, res) => {
  res.json({ message: "User access" });
});

export default router;
