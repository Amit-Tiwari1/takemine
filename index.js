import express from "express";
import sendMail from "./src/controllers/sendemail.js";
import { connection } from "./src/db/dbConnection.js";

// Call the connection function
connection();



const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.get("/mail", sendMail);

const start_Server = async () => {
  try {
  
  

    app.listen(PORT || 5000, () => {
      console.log(`App is listening at ${PORT}`);
    });
  } catch (error) {
    console.log("Error from app listening:", error);
  }
};


start_Server();
