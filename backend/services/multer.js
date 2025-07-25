import multer from "multer";


// ~ File Filters
let fileFilter = (req, file, cb) => {
  let allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  let isValidType = allowedTypes.includes(file.mimetype);
  if (isValidType) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPG, PNG, GIF, and PDF are allowed."),
      false
    );
  }
};
let upload = multer({
  dest : 'uploads/',
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default upload;
