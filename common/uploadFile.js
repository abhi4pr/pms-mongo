const multer = require("multer");
const path = require("path");
const vari = require('../variables.js')
const { Storage } = require("@google-cloud/storage");

exports.upload = multer({
  dest: "./uploads",
});

const storage = new Storage({
  // projectId: "noble-return-426210-t3",
  projectId: "hello-backend-416611",
  // keyFilename: path.join(__dirname, "../jarvis-dev-backend-cr.json"),
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

const uploadToGCP = (req, obj, fieldName) => {
  return new Promise((resolve, reject) => {
    if (req.file) {
      const bucketName = vari.BUCKET_NAME;
      const bucket = storage.bucket(bucketName);
      const blob = bucket.file(req.file.originalname);

      obj[fieldName] = blob.name;

      const blobStream = blob.createWriteStream();
      blobStream.on("finish", () => {
        resolve("Success");
      });
      blobStream.on("error", (err) => {
        reject(err);
      });
      blobStream.end(req.file.buffer);
    } else {
      reject(new Error("No file found in the request."));
    }
  });
};
exports.uploadToGCP = uploadToGCP