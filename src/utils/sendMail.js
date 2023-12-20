import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

export const sendOTPmail = async (email, OTP, full_name) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true, // Fix the typo here
      auth: {
        user: "imamitng@gmail.com",
        pass: "stlfwrzawahalahj",
      },
      
    });

    const content = `
      <p>Dear ${full_name},</p>
      <p>Thank you for choosing stakeminds! To ensure the security of your account, we require you to complete the OTP (One-Time Password) verification process.</p>
      <p>Your OTP is: <strong>${OTP}</strong></p>
      <p>Please enter this code on the verification page to complete the process.</p>
      <p>If you did not request this verification, please ignore this email. Your account security is important to us, and we recommend changing your password immediately.</p>
      <p>Thank you for using stakeminds!</p>
      <p>Best Regards,<br/>
      stakeminds<br/>
      pta nhi</p>
    `;

    const mailOptions = {
      from: "imamitng@gmail.com", // Replace with the sender's email address
      to: email,
      subject: "OTP verification",
      html: content,
    };

    transport.sendMail(mailOptions, function (error, information) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail sent successfully!", information.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
