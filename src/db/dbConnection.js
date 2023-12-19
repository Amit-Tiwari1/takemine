import mysql from "mysql2";

const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: "localhost",
    database: "student",
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

const executeQuery = (db) => {
  db.query(`SELECT * FROM users`, (error, result, fields) => {
    console.log("Query Error:", error);
    console.log("Query Result:", result);
    console.log("Query Fields:", fields);
    db.end(); // Close the database connection after executing the query
  });
};

export const connection = () => {
  const db = connectToDatabase();
  executeQuery(db);
};
