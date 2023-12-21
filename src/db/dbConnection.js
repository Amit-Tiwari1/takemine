import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: process.env.HOST_NAME,
    database: process.env.DATABASE_NAME,
    user: process.env.USER_NAME,
    password: process.env.DATABASE_PASSWORD,
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

export const executeQuery = (db) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    console.log(" Error:", error);
    console.log(" Result:", result);
    let response = result;
    db.end();
    return response;
  });
};
