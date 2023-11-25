// modules
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");

//db models
const designationModel = require("../models/designationModel.js");
const userModel = require("../models/userModel.js");
const attendanceModel = require("../models/attendanceModel.js");
const { base_url } = require("../common/constant.js");
const constant = require("../common/constant.js");
const notificationModel = require("../models/notificationModel.js");

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
        "../templates/offerLetterTemplate.ejs"
      );
      const template = await fs.promises.readFile(templatePath, "utf-8");

      const startDate = empData?.joining_date_extend || empData?.joining_date;
      const isJoiningDateExtended = empData.joining_date_extend !== null;

      // Generate Pdf file name
      let pdfFileName = isJoiningDateExtended
        ? `${empData?.user_name} Extend`
        : empData?.user_name;
      let digitalSignature;
      if (empData?.digital_signature_image) {
        pdfFileName += " Signed";
        digitalSignature = `${constant.base_url}/uploads/${empData?.digital_signature_image}`;
        
        const sms = new notificationModel({
            user_id: simc[0].id,
            notification_title: "Candidate has accepted offer letter",
            notification_message: `${simc[0].name} has been loggedin on ${formattedDateTime}`,
            created_by: simc[0].id
        })
        await sms.save();
      }

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
      let formattedOfferLaterAcceptanceDate;
      if (
        empData?.offer_later_acceptance_date &&
        empData?.offer_later_acceptance_date !== ""
      ) {
        formattedOfferLaterAcceptanceDate = new Intl.DateTimeFormat(
          "en-IN",
          options
        ).format(empData?.offer_later_acceptance_date);
      }

      //Pass data into template
      const html = ejs.render(template, {
        empName: empData?.user_name,
        permanentAddress: empData?.permanent_address,
        dateOfCreation: formattedOfferLaterDate,
        designation: designationData?.desi_name,
        reportTo: reportToData?.user_name,
        startDate: formattedStartDate,
        ctc: empData?.ctc,
        digitalSignature: digitalSignature ?? "",
        offerLaterAcceptanceDate: formattedOfferLaterAcceptanceDate ?? "",
      });

      //Save pdf at mention path
      const outputPath = path.join(
        __dirname,
        `../uploads/offerLetterPdf/${pdfFileName} Offer Letter.pdf`
      );

      // Generate PDF with Puppeteer
      // const browser = await puppeteer.launch({headless: "true"});  // For Localhsot
      const browser = await puppeteer.launch({
        headless: "true",
        executablePath: "/usr/bin/chromium",
      });
      const page = await browser.newPage();
      await page.setContent(html);
      await page.pdf({ path: outputPath, format: "A4" });
      await browser.close();

      await userModel.findOneAndUpdate(
        { user_id: empData?.user_id },
        {
          $set: {
            offer_later_pdf_url: `${base_url}/uploads/offerLetterPdf/${pdfFileName} Offer Letter.pdf`,
          },
        }
      );
    } catch (error) {
      console.log("PDF GENERATE ERR FOR OFFER LATER:", error.message);
    }
  },

  formateSecoundTime: (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    return `${days} days, ${hrs} hours, ${mnts} minutes, and ${seconds} seconds`;
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

  generateRandomPassword: () => {
    const randomString = Math.random().toString(36).slice(-6);
    return randomString;
  },
};
