const schedule = require("node-schedule");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const simModel = require("../models/simModel");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vijayanttrivedi1500@gmail.com",
    pass: "odovpikkjvkprrjv",
  },
});

const jobDays = schedule.scheduleJob("0 0 * * *", async () => {
  const currentDate = new Date();

  const simModels = await simModel.find({
    selfAuditFlag: false,
    hrAuditFlag: false,
    Creation_date: {
      $lte: new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
  });

  for (const simModel of simModels) {
    if (!simModel.selfAuditFlag) {
      const daysSinceCreation = Math.floor(
        (currentDate - simModel.Creation_date) / (24 * 60 * 60 * 1000)
      );
      if ([5, 10, 15].includes(daysSinceCreation)) {
        await sendReminderAssetEmail(simModel);
        await sendWhatsappSms(simModel);
      }
    }
  }
});

async function sendReminderAssetEmail(simModel) {
  const templatePath = path.join(__dirname, `assetemailtemp.ejs`);
  const template = await fs.promises.readFile(templatePath, "utf-8");
  const name = simModel.assetsName;
  const html = ejs.render(template, { name });

  let mailOptions = {
    from: "vijayanttrivedi1500@gmail.com",
    to: "ascs739@gmail.com",
    subject: "It's time to verify our asset",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Reminder email sent:", info.response);
    }
  });
}

async function sendWhatsappSms(simModel) {
  const simModels = await simModel.find({
    selfAuditFlag: false,
    hrAuditFlag: false,
    Creation_date: {
      $lte: new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000),
    },
  });

  simModels.forEach(async (sim) => {
    const response = await axios.post(
      "https://backend.api-wa.co/campaign/heyx/api",
      {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA0YmMyYTVjOTlmMGYwNmY3Y2QyNSIsIm5hbWUiOiJDcmVhdGl2ZWZ1ZWwiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjQ4MDRiYzJkYzhjZWYwNDViOTY3NTk2IiwiYWN0aXZlUGxhbiI6IkJBU0lDX01PTlRITFkiLCJpYXQiOjE2OTc0NDQ3OTB9.xg686Rd8V4J1PzDA27P1KBho1MTnYwo3X_WB0o0-6qs",
        campaignName: "CF_Pre_Onday_new",
        destination: "7000436496",
        userName: "aditi",
        templateParams: ["aditi"],
      }
    );
    if (response.status === 200) {
      console.log("API response", response.data);
    } else {
      console.error("API request failed with status", response.status);
    }
  });
}
