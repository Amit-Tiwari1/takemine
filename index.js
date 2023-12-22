import express from "express";
import { connectToDatabase } from "./src/db/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userroute from "./src/routes/userRoute.js";
import otpVerificationRoute from "./src/routes/otpVerificationRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", userroute);
app.use("/api/verify", otpVerificationRoute);

const start_Server = async () => {
  try {
    connectToDatabase();
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening at ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.log("Error from app listening:", error);
  }
};

start_Server();
