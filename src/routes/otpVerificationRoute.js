// otpVerificationRoute.js

import express from "express";
import { verifyOTP } from "../utils/otpVerification.js"; // Import the OTP verification function

const otpVerificationRouter = express.Router();

otpVerificationRouter.post("/verify", (req, res) => {
  const { userOTP, expectedOTP } = req.body;

  // Verify OTP
  if (!verifyOTP(userOTP, expectedOTP)) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  return res.status(200).json({ msg: "OTP verified successfully" });
});

export default otpVerificationRouter;
