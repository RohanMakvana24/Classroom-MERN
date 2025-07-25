import mongoose from "mongoose";

const tempImageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
});

const StaticImageModel = mongoose.model("StaticsImages", tempImageSchema);

export default StaticImageModel;
