import { body } from "express-validator";

export const validateSignup = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("firstName").notEmpty().withMessage("Please provide your first name"),
  body("lastName").notEmpty().withMessage("Please provide your last name"),
  body("role")
    .optional()
    .isIn(["trainee", "coach", "admin"])
    .withMessage("Invalid role"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Please provide your password"),
];
