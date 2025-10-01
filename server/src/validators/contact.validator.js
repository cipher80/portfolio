// import { body } from 'express-validator';

// export const contactValidator = [
//   body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
//   body('email').isEmail().withMessage('Valid email required'),
//   body('mobile')
//     .trim()
//     .matches(/^[0-9]{7,15}$/)
//     .withMessage('Mobile should be 7-15 digits (numbers only)'),
// ];

// server/src/validators/contact.validator.js
import { body } from "express-validator";

export const contactValidator = [
  body("type").optional().isIn(["contact", "call"]).withMessage("Invalid type"),
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 120 }),
  body("email").trim().isEmail().withMessage("Valid email is required").isLength({ max: 160 }),
  body("mobile").optional().trim().isLength({ min: 7, max: 24 }),
  body("message").optional().trim().isLength({ max: 5000 }),
  // For the call form we'll send "datetime" in ISO (built on the client from date+time)
  body("datetime").optional().isISO8601().withMessage("datetime must be an ISO string"),
  // "company" is a honeypot: no validation on purpose
];

