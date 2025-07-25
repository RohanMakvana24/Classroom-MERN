import UserModel from "../models/UserModel.js";
import uploadToCloudinary from "../utils/CloudinaryUploader.js";
import cloudinary from "cloudinary";
export const ChangeProfile = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const isuser = await UserModel.findById(id);
    if (!isuser) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }

    // Profile public_id exist than delete old images
    if (isuser.profile.public_id) {
      const result = await cloudinary.v2.uploader.destroy(
        isuser.profile.public_id,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    // ~ Profile Uploading
    const fileDetails = await uploadToCloudinary(
      req.file.path,
      req.file.originalname
    );

    // ~ Update Profile
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        profile: {
          url: fileDetails.secure_url,
          public_id: fileDetails.public_id,
        },
      },
      { new: true }
    );
    if (user) {
      return res.status(200).json({
        success: true,
        message: "Profile Updated Succefully",
        user: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Error in Profile Update API",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(504).json({
      success: false,
      message: error.message,
    });
  }
};
