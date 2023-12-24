import { validationResult } from "express-validator";
import { connectToDatabase } from "../db/dbConnection.js";
import { insertQuery, updateQuery } from "../utils/dynamicQueries.js";
import moment from "moment";
import { sendOTPmail } from "../utils/sendMail.js";
import { generateOTP } from "../utils/otpfuncation.js";
import { verifyOTP } from "../utils/otpVerification.js";
import { apiResponse } from "../utils/ApiResponse.js";

const db = connectToDatabase();
export let tempotp = null;
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
          const otp = generateOTP();
          tempotp = otp;
          console.log("otp", tempotp);
          if (otp) {
            try {
              sendOTPmail(fields.email, otp, fields.full_Name);
              console.log("OTP send !");
            } catch (error) {
              console.log(error);
            }
          }

          return res.status(200).send({
            msg: "OTP has been send on your register mail!",
          });
        });
      }
    }
  );
};

export const Is_Authenticated = async (userid, expectedOTP, res) => {
  console.log("userid", userid);
  console.log("expectedOTP", expectedOTP);
  try {
    const isVerified = verifyOTP(tempotp, expectedOTP);
    console.log("isVerified", isVerified);

    if (isVerified) {
      const fields = {
        Is_authenticate: true,
      };
      apiResponse(fields.Is_authenticate, "OTP Verified");

      // Update user authentication status asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          updateQuery(db, "users", fields, `user_id = ${userid}`),
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });

      res.status(200).json({
        msg: "OTP Verifed ! User register succefully!",
      });
    } else {
      res.status(400).json({
        msg: "OTP verification failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error updating user authentication status",
      error: error,
    });
  }
};
