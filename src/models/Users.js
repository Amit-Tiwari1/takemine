import { connection } from "../db/dbConnection.js";

export const User = {};

User.create = (newUser, result) => {
  db.query("INSERT INTO admin SET ?", newUser, (err, res) => {
    if (err) {
      console.error("Error creating user:", err);
      result(err, null);
      return;
    }
    console.log("Created user:", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
