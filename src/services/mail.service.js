const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendReceipt = async (to, buffer) => {
  await transporter.sendMail({
    from: `"SocietyCare" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Maintenance Payment Receipt",
    text: "Thank you for your payment.",
    attachments: [
      {
        filename: "receipt.pdf",
        content: buffer,
      },
    ],
  });
};
