// The next three imports are for multer "images" upload
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./media/Images", // according to App.js
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
