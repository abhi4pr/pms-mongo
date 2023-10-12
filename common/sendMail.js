var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vijayanttrivedi1500@gmail.com",
    pass: "odovpikkjvkprrjv",
  },
});

const mail = (subject, html) => {
  let mailOptions = {
    from: "vijayanttrivedi1500@gmail.com",
    to: "sumit722776@gmail.com",
    subject: subject,
    html: html,
  };
  transport.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);

    return info;
  });
};

module.exports = mail;
