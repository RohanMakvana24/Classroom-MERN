import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
const uploadToCloudinary = async (filepath, originalName) => {
  const extName = path.extname(originalName);
  const fileName = path.basename(originalName, extName);

  try {
    const result = await cloudinary.uploader.upload(filepath, {
      public_id: `uploads/${fileName}`,
      folder: "uploads",
      resource_type: "auto",
    });
       // Attempt to delete the file after successful upload
       try {
        fs.unlinkSync(filepath); // Synchronously delete the file
      } catch (deleteError) {
        console.error("Error deleting file:", deleteError);
      }
    return result;
  } catch (error) {
      // Attempt to delete the file after successful upload
      try {
        fs.unlinkSync(filepath); // Synchronously delete the file
      } catch (deleteError) {
        console.error("Error deleting file:", deleteError);
      }
     console.log(error)
  }
};

export default uploadToCloudinary;
