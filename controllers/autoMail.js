const schedule = require('node-schedule');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vijayanttrivedi1500@gmail.com',
    pass: 'odovpikkjvkprrjv',
  },
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

  users.forEach((user) => {
    const mailOptions = {
      from: 'vijayanttrivedi1500@gmail.com',
      to: user.user_email_id,
      subject: 'Reminder: Your Joining Date is Approaching',
      text: `Your joining date is on ${formattedDate}. Please prepare for your first day!`,
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
