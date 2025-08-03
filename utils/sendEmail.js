const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Create Options
  const emailOptions = {
    from: "E-Shop App <ahm19edhasan@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
