// userRoute.js

import express from "express";
import { signUpValidation } from "../utils/signUpValidation.js";
import * as userController from "../controllers/userController.js"; // Import userController as a single object

const router = express.Router();

router.post("/register", signUpValidation, userController.register);
router.post("/verify-otp", userController.verifyOTP); // Make sure this line is correct

export default router;
