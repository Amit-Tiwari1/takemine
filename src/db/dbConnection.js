import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

export const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: process.env.HOST_NAME,
    database: "stakemind_db",
    user: "root",
    password: "Welcome@123",
  });

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Database connected");
  });

  return db;
};

export const updateOTP = (db, email, otp) => {
  db.query(
    `UPDATE users SET otp = ? WHERE email = ?`,
    [otp, email],
    (err, result) => {
      if (err) {
        console.error("Error updating OTP:", err);
        return;
      }
      console.log("OTP updated successfully");
    }
  );
};

export const getOTP = (db, email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT otp FROM users WHERE email = ?`, [email], (err, result) => {
      if (err) {
        console.error("Error retrieving OTP:", err);
        reject(err);
        return;
      }

      if (result && result.length > 0) {
        const otp = result[0].otp;
        resolve(otp);
      } else {
        resolve(null);
      }
    });
  });
};
