import { body } from "express-validator";

export const validateSignup = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),
  body("firstName")
    .notEmpty()
    .withMessage("Please provide your first name")
    .trim(),
  body("lastName")
    .notEmpty()
    .withMessage("Please provide your last name")
    .trim(),
  body("role")
    .optional()
    .isIn(["trainee", "coach", "admin"])
    .withMessage("Invalid role"),
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Please provide your password"),
];

export const validateCreateUser = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("firstName").notEmpty().withMessage("Please provide first name").trim(),
  body("lastName").notEmpty().withMessage("Please provide last name").trim(),
  body("role")
    .notEmpty()
    .withMessage("Please specify role")
    .isIn(["trainee", "coach", "admin"])
    .withMessage("Invalid role"),
  body("trainingSite")
    .if(body("role").equals("trainee"))
    .notEmpty()
    .withMessage("Training site is required for trainees"),
  body("participantNumber")
    .if(body("role").equals("trainee"))
    .notEmpty()
    .withMessage("Participant number is required for trainees")
    .trim(),
];

export const validateUpdateUser = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("firstName")
    .optional()
    .notEmpty()
    .withMessage("First name cannot be empty")
    .trim(),
  body("lastName")
    .optional()
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .trim(),
  body("role")
    .optional()
    .isIn(["trainee", "coach", "admin"])
    .withMessage("Invalid role"),
];

export const validateUpdatePassword = [
  body("currentPassword").notEmpty().withMessage("currentPassword is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("newPassword is required")
    .isLength(8)
    .withMessage("Password must be at least 8 characters long."),
];
