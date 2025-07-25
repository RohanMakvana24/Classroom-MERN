import mongoose, { mongo } from "mongoose";

const BanerClassImagesSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      default: "others",
    },
    imagePath: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const ClassBanerImageModel = mongoose.model(
  "Banner-Images",
  BanerClassImagesSchema
);

export default ClassBanerImageModel;
