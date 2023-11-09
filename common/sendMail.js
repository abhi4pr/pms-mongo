var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "connect@creativefuel.io",
    pass: "clqjuhplszzqesiv",
  },
});

const mail = (subject, html,email) => {
  let mailOptions = {
    from: "connect@creativefuel.io",
    to: email,
    subject: subject,
    html: html,
  };
  transport.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);

    return info;
  });
};

module.exports = mail;
