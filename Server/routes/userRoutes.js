import express from "express";
import { getAllUsers } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  followUser,

  getUserById
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", protect, admin, getAllUsers);

// get user by Id
router.get("/userByID", protect,  getUserById);

//get user by Id
// router.get("/userByID", getUserById);

// follow- unfollow
router.post("/follow-unfollow/:id", protect, followUser);





export default router;
