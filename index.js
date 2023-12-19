import express from "express";
import sendMail from "./src/controllers/sendemail.js";
import userRoutes from "./src/routes/Users.js";

const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.get("/mail", sendMail);
app.use("/api/users", userRoutes);
const start_Server = async () => {
  try {
    app.listen(PORT || 5000, () => {
      console.log(`App is listening at ${PORT}`);
    });
  } catch (error) {
    console.log("error: from app listening ");
  }
};
start_Server();
