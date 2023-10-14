const fs = require("fs");
const path = require("path");

module.exports = {
  fileRemove: (filename, foldername) => {
    const folder = path.join(__dirname, foldername);
    const fileName = filename;

    if (fileName) {
      const filePath = path.join(folder, fileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          return {
            status: false,
            msg: err.message,
          };
        }
      });
    }
  },
};
