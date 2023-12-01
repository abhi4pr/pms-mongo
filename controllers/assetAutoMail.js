const schedule = require("node-schedule");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const simModel = require("../models/simModel");
const simAlloModel = require("../models/simAlloModel");
const userModel = require("../models/userModel");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vijayanttrivedi1500@gmail.com",
    pass: "odovpikkjvkprrjv",
  },
});

/* hr notification */

const hrAssetNotification = schedule.scheduleJob("0 0 * * *", async () => {

  const simModels = await simModel.aggregate([
    {
      $match: {
        hrAuditFlag: true,
        audit_status: "Done"
      }
    },
    {
      $lookup: {
        from: "simallomodels", 
        localField: "sim_id",
        foreignField: "sim_id",
        as: "simallo"
      }
    },
    {
      $lookup: {
        from: "usermodels", 
        localField: "simallo.user_id",
        foreignField: "user_id",
        as: "user"
      }
    },
    {
      $project:{
        _id: "$id",
        user_name: "$user.user_name",
        user_email_id: "$user.user_email_id",
        asset_name: "$assetName",
        next_hr_audit_date: "$next_hr_audit_date",
        audit_status: "$audit_status",
        user_contact_no: "$user_contact_no"
      }
    }
  ]);

  for (const simModel of simModels) {
    if (simModel.next_hr_audit_date == new Date() && simModel.audit_status == "Done") {
      simModel.findOneAndUpdate(
        { sim_id: simModel.sim_id },
        { audit_status: "Pending" }
      );
      await sendReminderAssetEmail(simModel)
      await sendWhatsappSms(simModel)
      
      for(let i=1; i<=30; i++){
        const nextRemainderDate = new Date(simModel.next_hr_audit_date)
        nextRemainderDate.setDate(nextRemainderDate.getDate() + i*7)

        schedule.scheduleJob("0 0 */7 * *", async()=>{
          await sendReminderAssetEmail(simModel)
          await sendWhatsappSms(simModel)
        })
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
    to: "aditi@creativefuel.io",
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
  simModel.forEach(async (sim) => {
    const response = await axios.post(
      "https://backend.api-wa.co/campaign/heyx/api",
      {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA0YmMyYTVjOTlmMGYwNmY3Y2QyNSIsIm5hbWUiOiJDcmVhdGl2ZWZ1ZWwiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjQ4MDRiYzJkYzhjZWYwNDViOTY3NTk2IiwiYWN0aXZlUGxhbiI6IkJBU0lDX01PTlRITFkiLCJpYXQiOjE2OTc0NDQ3OTB9.xg686Rd8V4J1PzDA27P1KBho1MTnYwo3X_WB0o0-6qs",
        campaignName: "CF_Pre_Onday_new",
        destination: "8517907328",
        userName: "Aditi",
        templateParams: ["Aditi"],
      }
    );
    if (response.status === 200) {
      console.log("API response", response.data);
    } else {
      console.error("API request failed with status", response.status);
    }
  });
}

/* self notification */

const selfAssetNotification = schedule.scheduleJob("0 0 * * *", async () => {

  const simModels = await simModel.aggregate([
    {
      $match: {
        selfAuditFlag: true,
        audit_status: "Done"
      }
    },
    {
      $lookup: {
        from: "simallomodels", 
        localField: "sim_id",
        foreignField: "sim_id",
        as: "simallo"
      }
    },
    {
      $lookup: {
        from: "usermodels", 
        localField: "simallo.user_id",
        foreignField: "user_id",
        as: "user"
      }
    },
    {
      $project:{
        _id: "$id",
        user_name: "$user.user_name",
        user_email_id: "$user.user_email_id",
        asset_name: "$assetName",
        next_self_audit_date: "$next_self_audit_date",
        audit_status: "$audit_status",
        user_contact_no: "$user_contact_no"
      }
    }
  ]);

  for (const simModel of simModels) {
    if (simModel.next_self_audit_date == new Date() && simModel.audit_status == "Done") {
      simModel.findOneAndUpdate(
        { sim_id: simModel.sim_id },
        { audit_status: "Pending" }
      );
      await sendReminderAssetEmail1(simModel)
      await sendWhatsappSms1(simModel)
      
      for(let i=1; i<=30; i++){
        const nextRemainderDate = new Date(simModel.next_self_audit_date)
        nextRemainderDate.setDate(nextRemainderDate.getDate() + i*7)

        schedule.scheduleJob("0 0 */7 * *", async()=>{
          await sendReminderAssetEmail1(simModel)
          await sendWhatsappSms1(simModel)
        })
      }
    }
  }
});

async function sendReminderAssetEmail1(simModel) {
  const templatePath = path.join(__dirname, `assetemailtemp.ejs`);
  const template = await fs.promises.readFile(templatePath, "utf-8");
  const name = simModel.assetsName;
  const html = ejs.render(template, { name });

  let mailOptions = {
    from: "vijayanttrivedi1500@gmail.com",
    to: simModel.user_email_id,
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

async function sendWhatsappSms1(simModel) {
  simModel.forEach(async (sim) => {
    const response = await axios.post(
      "https://backend.api-wa.co/campaign/heyx/api",
      {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA0YmMyYTVjOTlmMGYwNmY3Y2QyNSIsIm5hbWUiOiJDcmVhdGl2ZWZ1ZWwiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjQ4MDRiYzJkYzhjZWYwNDViOTY3NTk2IiwiYWN0aXZlUGxhbiI6IkJBU0lDX01PTlRITFkiLCJpYXQiOjE2OTc0NDQ3OTB9.xg686Rd8V4J1PzDA27P1KBho1MTnYwo3X_WB0o0-6qs",
        campaignName: "CF_Pre_Onday_new",
        destination: sim.user_contact_no,
        userName: sim.user_name,
        templateParams: [sim.user_name],
      }
    );
    if (response.status === 200) {
      console.log("API response", response.data);
    } else {
      console.error("API request failed with status", response.status);
    }
  });
}