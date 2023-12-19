import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  database: "company",
  user: "root",
  password: "Nowgray@2023",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Database connected");
});
