const fs = require("fs");
const path = require("path");
const attendanceModel = require("../models/attendanceModel.js");
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
  createNextInvoiceNumber: async (userId) => {
    const latestEntry = await attendanceModel
      .findOne()
      .sort({ _id: -1 })
      .exec();

    let nextIncrement = 1; // Start with 1 if there are no entries yet
    if (latestEntry && latestEntry.invoiceNo) {
      const parts = latestEntry.invoiceNo.split("/");
      const lastIncrement = parseInt(parts[2], 10);
      if (!isNaN(lastIncrement)) {
        nextIncrement = lastIncrement + 1; 
      }
    }

    // Construct the new invoiceNo
    const date = new Date();
    const year = date.getFullYear().toString().substring(2); // Get last two digits of the year
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase(); // Get the month abbreviation
    const monthYear = `${month}${year}`;

    return `${monthYear}/${userId}/${nextIncrement}`;
  },
};
