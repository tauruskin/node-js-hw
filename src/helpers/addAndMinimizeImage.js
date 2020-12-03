const path = require("path");
const multer = require("multer");
const Jimp = require("jimp");

const stroage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

exports.updateImage = upload.single("avatar");

