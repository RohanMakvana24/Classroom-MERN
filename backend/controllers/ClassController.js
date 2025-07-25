import { validationResult } from "express-validator";
import ClassModel from "./../models/ClassModel.js";
import StaticImageModel from "../models/TempImage.js";
import mongoose from "mongoose";
import { createCanvas, loadImage } from "canvas";
import { error } from "console";
import QRCode from "qrcode";
import uploadToCloudinary from "../utils/CloudinaryUploader.js";
import ClassBanerImageModel from "../models/Class-Baner-Images.js";
import UserModel from "../models/UserModel.js";
import { sensitiveHeaders } from "http2";
import sendMail from "../services/emailService/emailServies.js";
import inviteTeacherTemplate from "../templates/inviteTeacher.js";
// ~ Create Class Controller Section Start ~ //
export const createClass = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    const { className, section, subject, room, userId } = req.body;

    // ~ Unique Class Code Generates ~
    function generateRandomCode(length = 7) {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }

    // Update Role of User
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        roles: "teacher",
      },
      { new: true }
    );

    // ~ Store Data ~
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const Class = await ClassModel.create({
      className: className,
      code: generateRandomCode(),
      section: section,
      subject: subject,
      room: room,
      teacher: userObjectId,
    });

    res.status(200).json({
      success: true,
      message: "Class Added Succefully",
      Class: Class,
      User: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// ~ Create Class Controller Section End ~ //

// ~ Get All Class Controller Section Start ~ //
export const getAllClasses = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const Classes = await ClassModel.aggregate([
      {
        $match: {
          $or: [
            { teacher: objectId },
            { students: objectId },
            { subTeachers: objectId },
          ],
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      data: Classes,
    });
  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// ~ Get All Class Controller Section End ~ //

// ~~ Image Uploading Controller Section Start ~~ //
export const classStaticImageUpload = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    const { url } = req.body;
    await StaticImageModel.create({
      url: url,
    });
    return res.status(200).json({
      success: true,
      message: "Image Added Succefully",
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// ~~ Image Uploading Controller Section End ~~ //
export const getAllStaticImages = async (req, res) => {
  try {
    const images = await StaticImageModel.find({});
    if (images) {
      return res.status(200).json({
        success: true,
        images: images,
      });
    } else {
      return res.status(400).json({
        success: true,
        images: [{}],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      messge: error.message,
    });
  }
};

// ~~ Delete Class Controller ~~ //
export const deleteClass = async (req, res) => {
  try {
    const classId = req.params.classId;

    // ~ Validation ~
    //  const error = validationResult(req);
    //  if(!error.isEmpty()){
    //     return res.status(400).json({
    //       success :false,
    //       message : error.array()
    //     })
    //  }
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        sucess: false,
        message: "Required valid classId",
      });
    }

    const result = await ClassModel.findByIdAndDelete(classId);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Class is not found...",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Class Deleted Succefull",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// ~~ Get Single Class Controller 🔏 ~~ //
export const getSingleClass = async (req, res) => {
  try {
    const classId = req.params.classId;

    /* ~~ Validation ~~ */
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        sucess: false,
        message: "classId format invalid",
      });
    }

    const result = await ClassModel.findById(classId)
      .populate("teacher")
      .populate("students")
      .populate("bannerImage");
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Class Not Found.....",
      });
    }

    res.status(200).json({
      success: true,
      message: "Succefully Get Class..",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      sucess: false,
      message: error.message,
    });
  }
};

// ~~ Update Class Controller 🔏 ~~ //
export const UpdateClass = async (req, res) => {
  try {
    const errors = validationResult(req);

    // ~ Validation ~ //
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    // ~ Get Data ~ //
    const { className, room, section, subject, classId } = req.body;

    const isClass = await ClassModel.findById(classId);
    if (!isClass) {
      return res.status(400).json({
        success: false,
        message: "Class not exists",
      });
    }

    const updatedClass = await ClassModel.findByIdAndUpdate(classId, {
      className: className,
      room: room,
      section: section,
      subject: subject,
    });

    if (updatedClass) {
      return res.status(200).json({
        success: true,
        message: "Class Updated Succefully",
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "Somenthin Went Wrong in class update API ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// ~~ Get Class Code And QRCode Generator ~~ //
export const ClassCodeAndQr = async (req, res) => {
  try {
    const { classID } = req.query;

    // ~~ Validation ~~ //
    if (!mongoose.Types.ObjectId.isValid(classID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid classID.",
      });
    }

    // ~~ Fetch class data ~~ //
    const Class = await ClassModel.findById(classID);
    if (!Class) {
      return res.status(404).json({
        success: false,
        message: "Class not found.",
      });
    }

    // ~~ Generate QRCode as image buffer ~~ //
    const qrBuffer = await QRCode.toBuffer(Class.code, {
      width: 300,
      margin: 1,
    });

    // ~~ Create canvas and draw QR + text ~~ //
    const canvasWidth = 320;
    const canvasHeight = 400;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // Background (optional)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Load and draw QR
    const qrImage = await loadImage(qrBuffer);
    ctx.drawImage(qrImage, 10, 10, 300, 300);

    // Draw text
    ctx.fillStyle = "#000000";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Join our class using this QR code", canvasWidth / 2, 330);
    ctx.font = "bold 14px Arial";
    ctx.fillText("Powered by Classroom", canvasWidth / 2, 360);

    // ~~ Convert canvas to base64 ~~ //
    const finalImage = canvas.toDataURL();

    return res.status(200).json({
      success: true,
      data: {
        code: Class.code,
        url: finalImage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// `` Join Class Controller 🎎🎎 `` //
export const joinClassController = async (req, res) => {
  try {
    const { code, userId } = req.body;
    // ~ Validation ~ //
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Class Code is required",
      });
    }

    const Class = await ClassModel.findOne({ code: code });
    if (!Class) {
      return res.status(400).json({
        success: false,
        message: "Class is not exist....",
      });
    }

    const isTeacher = Class.teacher.toString() === userId;
    if (isTeacher) {
      return res.status(404).json({
        success: false,
        message: "You are not join our classs.....",
      });
    }

    const updatedClass = await ClassModel.findByIdAndUpdate(
      Class._id,
      {
        $addToSet: {
          students: userId,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Class Joined Succefull...",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// `` Uploading Static Baner Images Section Start `` //
export const uploadStaticBaner = async (req, res) => {
  try {
    const { category } = req.body;

    // `` Validation `` //
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required....",
      });
    }
    const fileDetails = await uploadToCloudinary(
      req.file.path,
      req.file.originalname
    );

    // ~~ Store ~~ //
    await ClassBanerImageModel.create({
      category: category,
      imagePath: {
        url: fileDetails.secure_url,
        public_id: fileDetails.public_id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Succefully Class Baner Uploaded",
    });
  } catch (error) {
    console.log(error);
    return res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
// `` Uploading Static Baner Images Section End `` //

// `` Get Class Static Banners Section Start `` //
export const getStaticBanersClass = async (req, res) => {
  try {
    const { category } = req.query;
    const Banners = await ClassBanerImageModel.find({ category: category });
    return res.status(200).json({
      success: true,
      data: Banners,
    });
  } catch (error) {
    res.status(504).json({
      success: false,
      message: "Somenthing Went Wrong with get Static Image API",
      data: [],
    });
  }
};
// `` Get Class Static Banners Section End `` //

// `` Upload Custome Banners Section Start `` //
export const uploadCustomeBanner = async (req, res) => {
  try {
    const file = req.file;
    const { classId } = req.body;
    // ~~ Validation ~~ //
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Banner is required",
      });
    }
    const fileDetails = await uploadToCloudinary(
      req.file.path,
      req.file.originalname
    );

    const Class = await ClassModel.findById(classId);
    if (!Class) {
      return res.status(400).json({
        success: false,
        message: "class is not exists",
      });
    }

    // ~~ Store ~~ //
    const newBanner = await ClassBanerImageModel.create({
      category: "others",
      imagePath: {
        url: fileDetails.secure_url,
        public_id: fileDetails.public_id,
      },
    });

    Class.bannerImage = newBanner._id;
    await Class.save();

    res.status(200).json({
      success: true,
      message: "Succefully Class Baner Uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// `` Set Class Banner Section Start `` //
export const setClassBanner = async (req, res) => {
  try {
    const { bannerId, classId } = req.body;

    const IsBannerImage = await ClassBanerImageModel.findById(bannerId);
    if (!IsBannerImage) {
      return res.status(400).json({
        status: false,
        message: "Banner image is not exists",
      });
    }

    const Class = await ClassModel.findById(classId);
    if (!Class) {
      return res.status(400).json({
        status: false,
        message: "Class is not exists",
      });
    }

    Class.bannerImage = bannerId;
    Class.save();
    return res.status(200).json({
      success: true,
      message: "Succefully added banner image",
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// `` Invite Teacher Controller `` //
export const inviteTeacher = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({
        success: false,
        message: errors.array(),
      });
    }
    const { email, classId } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        success: true,
        user: user,
        isUser: true,
        message:
          "Looks like this user is already in the classroom! 😁 Click 'OK' if you want to invite them as a sub-teacher.",
      });
    }
    const Class = await ClassModel.findById(classId);
    if (!Class) {
      return res.status(400).json({
        success: false,
        message: "Class not exist",
      });
    }
    const subject = "Invite Teacher";
    const invitLink = `${process.env.CLIENT_BASE_URL}/invite-teacher/${Class.code}`;
    const htmlContent = inviteTeacherTemplate(invitLink);
    sendMail(email, subject, htmlContent);
    return res.status(200).json({
      success: true,
      message: "Invite Email Succefully Sent",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// `` Invited Teacher Add Controller `` //
export const InvitedTeacherAdd = async (req, res) => {
  try {
    const { name, email, password, code } = req.body;

    // # Validation Error Send #
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    // # Check Already Ragistered Email #
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message:
          "This email is already registered. Please use a different one.",
      });
    }

    // # User Create #
    const newUser = await UserModel.create({
      fullname: name,
      email: email,
      password: password,
      verified: true,
      roles: "subteacher",
    });

    // # Add Teacher In Class
    const Class = await ClassModel.findOne({
      code: code,
    });
    if (!Class) {
      return res.status(400).json({
        success: false,
        message: "Class does not exist",
      });
    }
    await ClassModel.findByIdAndUpdate(Class._id, {
      subTeachers: newUser._id,
    });

    // # Success Response
    res.status(200).json({
      success: true,
      message: "New teacher has been assigned successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// `` Sub Teacher Notification Sent Controller `` //
export const sentNotificationSubteacher = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const { email, userid } = req.body;
    console.log(userid);
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }
    const notification = {
      message:
        "You have accepted the request and joined the class as a Sub-Teacher.",
      user: userid,
      actions: ["accept", "decline"],
      createdAt: Date.now(),
    };

    user.notifications.push(notification);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Sub-Teacher invitation has been sent successfully to the user.",
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// `` Get All Notification Controller `` //
export const getAllNotifications = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Oops! Looks like the user ID is invalid or missing.",
      });
    }

    const user = await UserModel.findById(id).populate(
      "notifications.user",
      "fullname profile.url"
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found with the provided ID.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sucefully get notifications",
      notifications: user.notifications,
    });
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};

// `` Notification Mark Show Controller `` //
export const markShowNotification = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        sucess: false,
        message: "Provided Notification id invalid",
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { "notifications._id": id },
      { $set: { "notifications.$.show": true } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.json({
      success: true,
      message: "Notification updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
