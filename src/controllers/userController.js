// userController.js

import { validationResult } from "express-validator";
import { connectToDatabase } from "../db/dbConnection.js";
import { insertQuery } from "../utils/dynamicQueries.js";
import moment from "moment";
import { sendOTPmail } from "../utils/sendMail.js";
import { generateOTP } from "../utils/otpfication.js";
import { updateOTP, getOTP } from "../db/dbConnection.js";

const db = connectToDatabase();

export const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;

  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).send({
        message: "User already exists!",
      });
    }

    // User does not exist, proceed with registration
    const formattedDate = moment(req.body.last_Login || new Date()).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const fields = {
      full_Name: req.body.full_Name,
      email: email,
      Is_authenticate: req.body.Is_authenticate || 0,
      last_Login: formattedDate,
      role_id: req.body.role_id || 1,
    };

    // Insert user into the database
    db.query(insertQuery(db, "users", fields), async (err, result) => {
      if (err) {
        return res.status(500).send({
          message: "Error registering user",
          error: err,
        });
      }

      // Generate and send OTP
      const otp = generateOTP();
      console.log("otp", otp);

      if (otp) {
        try {
          await sendOTPmail(fields.email, otp, fields.full_Name);

          // Update the OTP in the database
          await updateOTP(db, email, otp);

          console.log("otp sent and updated in the database");
        } catch (error) {
          console.log(error);
        }
      }

      return res.status(200).send({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.error("Error checking existing user:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error,
    });
  }
};

export const verifyOTP = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, otp } = req.body;

  try {
    // Retrieve the stored OTP from the database
    const storedOTP = await getOTP(db, email);

    if (storedOTP && storedOTP === otp) {
      // OTP is valid
      return res.status(200).json({
        message: "OTP verified successfully",
      });
    } else {
      // Invalid OTP
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

// Helper function to get user by email
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER(?)`, [email], (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (result && result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
};
