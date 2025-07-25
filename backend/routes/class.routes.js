import express from "express";
import { body, param } from "express-validator";
import mongoose from "mongoose";
import upload from "../services/multer.js";
import QRCode from "qrcode";
import {
  ClassCodeAndQr,
  classStaticImageUpload,
  createClass,
  deleteClass,
  getAllClasses,
  getAllNotifications,
  getAllStaticImages,
  getSingleClass,
  getStaticBanersClass,
  InvitedTeacherAdd,
  inviteTeacher,
  joinClassController,
  markShowNotification,
  sentNotificationSubteacher,
  setClassBanner,
  UpdateClass,
  uploadCustomeBanner,
  uploadStaticBaner,
} from "../controllers/ClassController.js";
import isAuthenticated from "../middleware/auth.js";
import UserModel from "../models/UserModel.js";
const ClassRoutes = express.Router();

// ~  Create Class Routes 🚦💨 ~ //
ClassRoutes.post(
  "/create-class",
  upload.none(),
  [
    body("className")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Class name must be between 3 and 20 characters.")
      .notEmpty()
      .withMessage("Classname is required "),
    body("section")
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Section must be between 3 to 30 characters"),
    body("subject")
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("The Subject must be between 3 to 20 charcaters"),
    body("room")
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("The room must be between 3 to 20 charcaters"),
    body("userId")
      .notEmpty()
      .withMessage("User ID is required")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid user ID format"),
  ],
  isAuthenticated,
  createClass
);

// ~~ Get Classes Routes 🚦💨 ~~ //
ClassRoutes.get(
  "/get-all-classes/:userId",
  [
    param("userId")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("The User id "),
  ],
  isAuthenticated,
  getAllClasses
);

// ~~ Images Uploading API For Classe  🚦💨 ~~ //
ClassRoutes.post(
  "/image-add",
  [body("url").isString().withMessage("Url is required")],
  classStaticImageUpload
);

// ~~ Images Uploading API For Classe  🚦💨 ~~ //
ClassRoutes.get("/get-all-staticimages", isAuthenticated, getAllStaticImages);

// ~~ Delete Classs API  🚦💨 ~~ //
ClassRoutes.delete("/delete-class/:classId", isAuthenticated, deleteClass);

// ~~ Get Single Class API.. 🚦💨 ~~ //
ClassRoutes.get("/get-single-class/:classId", isAuthenticated, getSingleClass);

// ~~ Update Class API.. 🚦💨 ~~ //
ClassRoutes.put(
  "/update-class",
  [
    body("className")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Class name must be between 3 and 20 characters.")
      .notEmpty()
      .withMessage("Classname is required"),
    body("section")
      .optional()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Section must be between 3 to 30 characters"),
    body("room")
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("The room must be between 3 to 20 charcaters"),
    body("subject")
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("The Subject must be between 3 to 20 charcaters"),
    body("classId")
      .notEmpty()
      .withMessage("ClassId is required")
      .custom((value) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("Invalid user ID format"),
  ],
  isAuthenticated,
  UpdateClass
);

// ~~ QRCode Generator ~~ //
ClassRoutes.get("/get-class-code", isAuthenticated, ClassCodeAndQr);

// ~~ Join Class API.. 🚦💨 ~~ //
ClassRoutes.post("/join-class", isAuthenticated, joinClassController);

// ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌ //
// ~~ Uploading Class Baner Static API 🚦💨 ~~ //
ClassRoutes.post(
  "/upload-static-banner",
  upload.single("banner-image"),
  uploadStaticBaner
);

// ~~ Get Class Banner Static API 🚦💨 ~~ //
ClassRoutes.get("/get-static-banners", getStaticBanersClass);

// ~~ Upload Custome Banners API 🚦💨 ~~ //
ClassRoutes.post(
  "/upload-custome-banner",
  upload.single("banner"),
  uploadCustomeBanner
);

// ~~ Set Class Banner Image  API 🚦💨 ~~ //
ClassRoutes.post("/set-banner-image", setClassBanner);

// `` Invite Teacher Route `` //
ClassRoutes.post(
  "/invite-teacher",
  [body("email").isEmail().withMessage("Email is required")],
  inviteTeacher
);

// `` Invited Teacher Add Route `` //
ClassRoutes.post(
  "/invited-teacher-add",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .notEmpty()
      .withMessage("Email is required"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      )
      .withMessage(
        "Password must include uppercase, lowercase, number, and special character"
      ),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords must match");
        }
        return true;
      }),

    body("code").notEmpty().withMessage("Invite code is required"),
  ],
  InvitedTeacherAdd
);

// `` Notification Send `` //
ClassRoutes.post(
  "/sent-subteacher-notification",
  [body("email").isEmail().withMessage("Email field is required")],
  sentNotificationSubteacher
);

// `` Notification Send `` //

ClassRoutes.get("/get-notifications/:id", getAllNotifications);

// `` Mark-Show Notification True `` //
ClassRoutes.patch("/notification/mark-show/:id", markShowNotification);
export default ClassRoutes;
