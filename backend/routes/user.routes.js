import express from "express";
import upload from "../services/multer.js";
import { ChangeProfile } from "../controllers/UserController.js";
import { body, param } from "express-validator";
import mongoose from "mongoose";
import isAuthenticated from "../middleware/auth.js";
const userRoutes = express.Router();

// ~  Profile Update Routes 🚦💨 ~ //
userRoutes.put(
  "/change-profile/:id",
  [
    param("id")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("User ID invalid format"),
  ],
  upload.single("profile"),
  isAuthenticated,
  ChangeProfile
);

export default userRoutes;
