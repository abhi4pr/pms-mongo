const multer = require("multer");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

exports.upload = multer({
  dest: "./uploads",
});

const storage = new Storage({
  // projectId: "node-develop-server",
  projectId: "hello-backend-416611",
  // keyFilename: path.join(__dirname, "../node-develop-server-1b8fcebc0305.json"),
  keyFilename: path.join(__dirname, "../hello-backend-416611-5a1009ac3405.json"),
});
exports.storage = storage;

const upload1 = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
});

exports.upload1 = upload1;

// exports.upload = multer({
//   dest: "./uploads",
// });

// //Generate actual fileName with view functionality
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {

//     if (file.fieldname === "upload_logo") {
//       cb(null, "./uploads/logo");
//     } else if (file.fieldname === "creatorImageToServer") {
//       cb(null, "./uploads/Creator_s Avatar");
//     } else if (file.fieldname === "campaignImageToServer") {
//       cb(null, "./uploads/Campaign_s Avatar");
//     } else if (file.fieldname === "brandImageToServer") {
//       cb(null, "./uploads/Brand_s Avatar");
//     } else if (file.fieldname === "doc_image") {
//       cb(null, "./uploads/userDocuments");
//     } else if (file.fieldname === "Product_image") {
//       cb(null, "./uploads/productImage");
//     } else if (file.fieldname === "content_sec_file") {
//       cb(null, "./uploads/contentSecFiles");
//     } else if (file.fieldname === "data_upload") {
//       cb(null, "./uploads/dataimages");
//     } else {
//       cb(null, "./uploads");
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const uploadfile = multer({ storage: storage });