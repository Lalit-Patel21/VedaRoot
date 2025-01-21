// mailerConfig.js
import nodemailer from "nodemailer";

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
};

export default transporter;

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "Gmail", // or any other email service you prefer
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendOTP = async (to, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USERNAME,
//     to,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("OTP sent successfully");
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//   }
// };
