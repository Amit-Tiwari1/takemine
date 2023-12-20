import { validationResult } from "express-validator"; // params validation
import { connectToDatabase } from "../db/dbConnection.js";
import { insertQuery } from "../utils/dynamicQueries.js";
import moment from "moment";

const db = connectToDatabase();
export const register = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: "Error checking existing user",
          error: err,
        });
      }

      if (result && result.length) {
        return res.status(409).send({
          msg: "User already exists!",
        });
      } else {
        const formattedDate = moment(req.body.last_Login || new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const fields = {
          full_Name: req.body.full_Name,
          email: req.body.email,
          Is_authenticate: req.body.Is_authenticate || 0,
          last_Login: formattedDate,
          role_id: req.body.role_id || 1,
        };
        db.query(insertQuery(db, "users", fields), (err, result) => {
          if (err) {
            return res.status(500).send({
              msg: "Error registering user",
              error: err,
            });
          }
          return res.status(200).send({
            msg: "User registered successfully",
          });
        });
      }
    }
  );
};
