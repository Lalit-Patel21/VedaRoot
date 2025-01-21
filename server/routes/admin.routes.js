import express from "express";
import { body } from "express-validator";
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  signInAdmin,
  forgotpassword,
  verifyOTP,
  setnewpassword,
  updatepassword,
  listbyemail,
} from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

// Validation rules
const validateAdmin = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required and should be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("lastLogin")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Last Login should be a valid date"),
];

const validateSignIn = [
  body("email").isEmail().withMessage("Email is required and should be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
];

// Define routes for admin operations
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/", validateAdmin, createAdmin);
router.put("/:id", validateAdmin, updateAdmin);
router.delete("/:id", deleteAdmin);
router.post("/signin", validateSignIn, signInAdmin);
router.post(
  "/forgotpassword",
  body("email", "invalid email").isEmail().notEmpty(),
  forgotpassword
);
router.post("/verifyOTP", verifyOTP);
router.patch(
  "/setnewpassword",
  body("email", "invalid email").isEmail().notEmpty(),
  body("password", "invalid password").notEmpty(),
  setnewpassword
);
router.patch(
  "/updatepassword",
  body("id", "invalid id").notEmpty(),
  body("oldpassword", "invalid password").notEmpty(),
  body("newpassword", "invalid password").notEmpty(),
  updatepassword
);
router.get(
  "/viewadminbyemail",
  body("email", "invalid email").isEmail().notEmpty(),
  listbyemail
);
router.post("/viewadminbyid", verifyToken, getAdminById);
router.get("/viewadminList", getAllAdmins);

export default router;
