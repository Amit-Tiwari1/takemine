import express from "express";
import { verifyOTP } from "../utils/otpVerification.js";
import { Is_Authenticated } from "../controllers/userController.js";

const otpVerificationRouter = express.Router();

otpVerificationRouter.post("/:userid/:expectedOTP", async (req, res) => {
  try {
    const { userid, expectedOTP } = req.params;
    console.log("userid", userid);
    console.log("expectedOTP", expectedOTP);

    await Is_Authenticated(userid, expectedOTP, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error in OTP verification",
      error: error,
    });
  }
});

export default otpVerificationRouter;
