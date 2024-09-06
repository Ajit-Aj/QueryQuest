import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  updateUserStatus,
  getDashboardStats,
  deleteSpace,
  getAllSpaces,
} from "../controllers/adminController.js";

const router = express.Router();

// to update user status
router.patch("/status/:id", protect, admin, updateUserStatus);

// Route to get dashboard stats
router.get("/dashboard-stats", protect, admin, getDashboardStats);

// Route to get all spaces
router.get("/spaces", protect, admin, getAllSpaces);

// Route to delete a space
router.delete("/spaces/:spaceId", protect, admin, deleteSpace);

export default router;
