const multer = require("multer");
const path = require("path");
const vari = require('../variables.js')
const { Storage } = require("@google-cloud/storage");

exports.upload = multer({
  dest: "./uploads",
});

const storage = new Storage({
  // projectId: "noble-return-426210-t3",
  projectId: "react-migration-project",
  // keyFilename: path.join(__dirname, "../jarvis-dev-back-project-d2580576b574.json"),
  keyFilename: path.join(__dirname, "../react-migration-project-bb8a3ffdd3d0.json"),
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

      // const blob = bucket.file(req.file.originalname);
      // obj[fieldName] = blob.name;

      const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
      const newFilename = `${timestamp}__${req.file.originalname}`;
      const blob = bucket.file(newFilename);

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