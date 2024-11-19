import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Specify email service (e.g., 'Outlook', 'Yahoo', etc.)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const emailProvider = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your email verification OTP is",
      text: `your otp is ${otp}. it will expire in 10 minites`,
      html: <b>your otp is ${otp}. it will expire in 10 minites</b>,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error, "error handling email OTP");
    throw new Error(error.message, "failed to send e-mail");
  }
};
