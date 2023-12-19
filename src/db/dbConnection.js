import mysql from "mysql2";

const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: "localhost",
    database: "student",
    user: "root",
    password: "Welcome@123",
  });
  // console.log("connecteToDATabase",db)

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
    return response 
  });
};
console.log("execute",response)

export const connection = () => {
  const db = connectToDatabase();
  executeQuery(db);
};
