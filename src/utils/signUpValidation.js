// signUpValidation.js
import { check } from "express-validator";
// signUpValidation.js
import validator from "validator"; // Import the entire 'validator' module

export const signUpValidation = [
  check("full_Name", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid email")
    .isEmail()
    .custom((value) => {
      const normalizedEmail = validator.normalizeEmail(value, {
        gmail_remove_dots: true,
      });
      return validator.isEmail(normalizedEmail);
    }),
];
