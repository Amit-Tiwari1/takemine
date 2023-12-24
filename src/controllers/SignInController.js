import { validationResult } from "express-validator";
import { connectToDatabase } from "../db/dbConnection.js";
import moment from "moment";
import { generateOTP } from "../utils/otpfuncation.js";
import { sendLogInOTP } from "../utils/sendMail.js";
import { verifyOTP } from "../utils/otpVerification.js";
import { updateQuery } from "../utils/dynamicQueries.js";

const db = connectToDatabase();
let tempotp = null;

// ************************singin function section start****************************
export const signIn = (req, res) => {
  // Check request errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user;

  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: "Error checking existing user!",
          error: err,
        });
      }

      // If the user exists, proceed with the main flow
      if (result && result.length) {
        user = result[0];
        const formattedDate = moment(req.body.last_Login || new Date()).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const userSendFields = {
          email: req.body.email,
          expectedOtp: req.body.expectedOtp,
          userFullName: user.full_Name,
          user_id: user.user_id,
        };

        // Generate and send OTP
        const otp = generateOTP();
        tempotp = otp;
        console.log("otp and temp otp", tempotp);

        if (otp) {
          try {
            sendLogInOTP(
              userSendFields.email,
              otp,
              userSendFields.userFullName
            );
          } catch (error) {
            console.log(error);
          }

          return res.status(200).json({ msg: "User exists", user });
        } else {
          console.log("Error generating OTP!");
          return res.status(500).json({ msg: "Error generating OTP" });
        }
      } else {
        console.log("User not found!");
        return res.status(404).json({ msg: "User not found" });
      }
    }
  );
};

// ************************singin otpverification section start****************************
export const Is_Authenticated = async (userId, expectedOTP, res) => {
  console.log("userId", userId);
  console.log("expectedOTP", expectedOTP);

  try {
    const isVerified = verifyOTP(tempotp, expectedOTP);
    console.log("isVerified", isVerified);

    if (isVerified) {
      // Update last login time
      const updateResult = await updateLastLogin(userId);

      if (updateResult) {
        res.status(200).json({
          msg: "OTP Verified! Last login time updated.",
        });
      } else {
        res.status(500).json({
          msg: "Error updating last login time.",
        });
      }
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

const updateLastLogin = (userId) => {
  return new Promise((resolve, reject) => {
    const fields = {
      last_login: new Date(),
    };

    db.query(
      updateQuery(fields, "users", `user_id = ${userId}`),
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows > 0);
        }
      }
    );
  });
};
