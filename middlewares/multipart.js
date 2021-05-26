const multer = require("multer");

const uploadedFilesFolderName = 'public';
exports.uploadedFilesFolderName = uploadedFilesFolderName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./" + uploadedFilesFolderName);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 * 1024 },
});
exports.upload = upload;
