import express from "express";
import sendMail from "./src/controllers/sendemail.js";
import { connection,result } from "./src/db/dbConnection.js";
console.log("indfile",result)
const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Server is live");
});
app.get("/mail", sendMail);
app.get("/getdata",(req,res)=>{
  res.send("data is here",result)
})

const start_Server = async () => {
  try {
    connection();
    app.listen(PORT || 5000, () => {
      console.log(`App is listening at ${PORT}`);
    });
  } catch (error) {
    console.log("Error from app listening:", error);
  }
};


start_Server();
