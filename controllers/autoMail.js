const schedule = require('node-schedule');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const fs = require('fs');
const ejs = require('ejs');
const path = require("path");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vijayanttrivedi1500@gmail.com',
    pass: 'odovpikkjvkprrjv',
  },
});

const job0Days = schedule.scheduleJob('0 0 * * *', async () => {
  sendReminderEmail(0);
});

const job1Days = schedule.scheduleJob('0 0 * * *', async () => {
  sendReminderEmail(1);
});

const job2Days = schedule.scheduleJob('0 0 * * *', async () => {
  sendReminderEmail(2);
});

const job3Days = schedule.scheduleJob('0 0 * * *', async () => {
  sendReminderEmail(3);
});

async function sendReminderEmail(daysBefore) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysBefore);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}T00:00:00.000+00:00`;

  const users = await userModel.find({ joining_date: formattedDate });

  users.forEach(async (user) => {
  // users.forEach((user) => {
  // const templatePath = `controllers/emailtemp${daysBefore}.ejs`;
    // const templateContent = fs.readFileSync(templatePath, 'utf-8');
    // const compiledTemplate = ejs.compile(templateContent);

    // const mailOptions = {
    //   from: 'vijayanttrivedi1500@gmail.com',
    //   to: user.user_email_id,
    //   subject: 'Reminder: Your Joining Date is Approaching',
    //   html : compiledTemplate({ formattedDate })
    // };

    const templatePath = path.join(__dirname, `emailtemp${daysBefore}.ejs`);
    const template = await fs.promises.readFile(templatePath, "utf-8");
    const name = user.user_name;
    const html = ejs.render(template, {name} );

    let mailOptions = {
        from: "vijayanttrivedi1500@gmail.com",
        to: user.user_email_id,
        subject: 
          daysBefore === 0
          ? "Welcome to CreativeFuel! It's almost time."
          : daysBefore === 1
          ? "See you tomorrow! With love, CF"
          : daysBefore === 2
          ? "Have you geared up yet? #2daystogo!"
          : daysBefore === 3
          ? "the countdown begins! #3daystogo!"
          : "Your Joining Date is Approaching",
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Reminder email sent:', info.response);
      }
    });
  });
}
