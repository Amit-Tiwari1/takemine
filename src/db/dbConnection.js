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
    password: "Nowgray@2023",
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

const executeQuery = (db) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    console.log(" Error:", error);
    console.log(" Result:", result);
    let response = result;
    db.end();
    return response;
  });
};
