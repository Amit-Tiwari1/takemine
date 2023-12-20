import express from "express";
import { signUpValidation } from "../utils/signUpValidation.js";
import * as userController from "../controllers/userController.js"; // Import all exports as a single object
const router = express.Router();

router.post("/register", signUpValidation, userController.register);

export default router;
