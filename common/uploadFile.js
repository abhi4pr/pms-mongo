const multer = require("multer");
const path = require("path");

//Generate rendom string fileName with direct download functionality
exports.upload = multer({
  dest: "./uploads",
});

//Generate actual fileName with view functionality
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "Product_image") {
      cb(null, "./uploads/productImage");
    } else if (file.fieldname === "content_sec_file") {
      cb(null, "./uploads/contentSecFiles");
    } else {
      cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadfile = multer({ storage: storage });
exports.upload1 = uploadfile;
