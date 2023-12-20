import express from "express";
import sendMail from "./src/controllers/sendemail.js";
import { connectToDatabase } from "./src/db/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userroute from "./src/routes/userRoute.js";

dotenv.config({
  path: "./env",
});

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", userroute);
// error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Server is live");
});
app.get("/mail", sendMail);
app.get("/getdata", (req, res) => {
  res.send("data is here", result);
});

const start_Server = async () => {
  try {
    connectToDatabase();
    app.listen(PORT || 5000, () => {
      console.log(`App is listening at ${PORT}`);
    });
  } catch (error) {
    console.log("Error from app listening:", error);
  }
};

start_Server();
