import express from "express";
import userController from "../controllers/Users.js";

const router = express.Router();

router.post("/register", userController.registerUser);
// router.get("/get", userController.getAllUsers);

export default router;
