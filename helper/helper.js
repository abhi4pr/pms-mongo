// modules
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");

//db models
const designationModel = require("../models/designationModel.js");
const userModel = require("../models/userModel.js");
const attendanceModel = require("../models/attendanceModel.js");

module.exports = {
  generateOfferLaterPdf: async (empData) => {
    try {
      const designationData = await designationModel.findOne(
        { desi_id: empData?.user_designation },
        "desi_name"
      );

      const reportToData = await userModel.findOne(
        { user_id: empData?.Report_L1 },
        "user_name"
      );

      const templatePath = path.join(
        __dirname,
        "../templates/offerLaterTemplate.ejs"
      );
      const template = await fs.promises.readFile(templatePath, "utf-8");

      const startDate = empData?.joining_date_extend || empData?.joining_date;
      const isJoiningDateExtended = empData.joining_date_extend !== null;

      // Generate Pdf file name
      const pdfFileName = isJoiningDateExtended
        ? `${empData?.user_name} Extend`
        : empData?.user_name;

      // Formate Date
      const inputDate = new Date(startDate);
      const options = { month: "long", day: "numeric", year: "numeric" };
      const formattedStartDate = new Intl.DateTimeFormat(
        "en-IN",
        options
      ).format(inputDate);
      const formattedOfferLaterDate = new Intl.DateTimeFormat(
        "en-IN",
        options
      ).format(empData?.offer_later_date);

      //Pass data into template
      const html = ejs.render(template, {
        empName: empData?.user_name,
        permanentAddress: empData?.permanent_address,
        dateOfCreation: formattedOfferLaterDate,
        designation: designationData?.desi_name,
        reportTo: reportToData?.user_name,
        startDate: formattedStartDate,
        ctc: empData?.ctc,
      });

      //Save pdf at mention path
      const outputPath = path.join(
        __dirname,
        `../uploads/offerLaterPdf/${pdfFileName} Offer Later.pdf`
      );

      // Generate PDF
      pdf.create(html).toFile(outputPath, (err, res) => {
        if (err) console.error(err);
      });
    } catch (error) {
      console.log("PDF GENERATE ERR FOR OFFER LATER:", error.message);
    }
  },

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
