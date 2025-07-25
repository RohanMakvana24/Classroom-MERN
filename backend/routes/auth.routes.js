import express from "express";
import { body } from "express-validator";
import {
  deleteUser,
  ForgotPassword,
  GoogleLogin,
  isVerifiedUser,
  LoginUser,
  OTP_Verification,
  PrivateAuth,
  ResendOtp,
  ResetPassword,
  SignupUser,
  VerifyUser,
} from "../controllers/AuthController.js";
import upload from "../services/multer.js";
import isAuthenticated from "../middleware/auth.js";
const AuthRoutes = express.Router();

// ~ Signup Route 🚦💨 ~ //
AuthRoutes.post(
  "/signup",
  upload.single("profile"),
  [
    body("fullname")
      .isLength({ min: 5 })
      .withMessage("Fullname must be at least 5 characters long"),

    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],
  SignupUser
);

// ~ Verification Route 🚦💨 ~ //
AuthRoutes.get("/verify/:verificationToken", VerifyUser);

// ~ Verification Route 🚦💨 ~ //
AuthRoutes.get("/isverify/:u_id", isVerifiedUser);

// ~ Delete User Routes 🚦💨 ~ //
AuthRoutes.delete("/deleteUser/:id", deleteUser);

// ~ Login User Routes 🚦💨 ~ //
AuthRoutes.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],
  LoginUser
);

// ~ Forgot Password Routes 🚦💨 ~ //
AuthRoutes.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Email is required")],
  ForgotPassword
);

// ~ OTP Verification Routes 🚦💨 ~ //
AuthRoutes.post("/otp-verification", OTP_Verification);

// ~ Reset Password Routes 🚦💨 ~ //
AuthRoutes.post(
  "/reset-password",
  [
    body("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be between 8 and 20 characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      })
      .withMessage("Confirm Password must match Password"),
  ],
  ResetPassword
);

// ~ Resend OTP Routes 🚦💨 ~ //
AuthRoutes.post("/resend-otp", ResendOtp);

// ~ Google Login  Routes 🚦💨 ~/ /
AuthRoutes.get("/google-login", GoogleLogin);

// ~ Private Routes  Routes 🚦💨 ~ //
AuthRoutes.get("/private-auth", isAuthenticated, PrivateAuth);

export default AuthRoutes;
