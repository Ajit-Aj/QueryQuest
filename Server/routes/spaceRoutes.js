import express from "express";
import {
  createSpace,
  joinSpace,
  getAllSpaces,
  getSpaceById,
  getSpacesByUserId,
  updateSpace,
  deleteSpace,
} from "../controllers/spaceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new space
router.post("/create", protect, createSpace);

// Join a space
router.post("/join/:id", protect, joinSpace);

// Get all spaces
// router.get('/', protect, getAllSpaces);
router.get("/", protect, getAllSpaces);

// Get space by ID
// router.get('/:id', protect, getSpaceById);
router.get("/:id", protect, getSpaceById);

// Get spaces by user ID
// router.get('/user/:userId', protect, getSpacesByUserId);
router.get("/userspace/:userId", protect, getSpacesByUserId);

// Update a space (e.g., add members)
router.put("/update/:id", protect, updateSpace);

// Delete a space
router.delete("/delete/:id", protect, deleteSpace);

export default router;
