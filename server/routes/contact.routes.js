import express from "express";
import { body } from "express-validator";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

// Validation rules
const validateContact = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
];
const validateStatus = [
  body("status")
    .isIn(["open", "in progress", "resolved"])
    .withMessage("Invalid status"),
];

// Define routes for contact operations
router.post("/", validateContact, createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.patch("/:id/status", validateStatus, updateContactStatus);
router.delete("/:id", deleteContact);

export default router;
