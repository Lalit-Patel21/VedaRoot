import express from "express";
import { body } from "express-validator";
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  addDoctorRating,
  signInDoctor,
  updateProfile,
  updatePassword,
  forgetPassword,
  verifyOTP,
  setNewPassword,
  viewDoctorProfile,
} from "../controllers/doctor.controller.js";

const router = express.Router();

// Validation rules
const validateDoctor = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
  // body("contactNumber").notEmpty().withMessage("Contact number is required"),
];

const validateRating = [
  body("userId").isMongoId().withMessage("User ID must be a valid ObjectId"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("review").notEmpty().withMessage("Review is required"),
];

// Define routes for doctor operations  http://localhost:5000/api/doctor
router.post("/", validateDoctor, createDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", validateDoctor, updateDoctor);
router.delete("/:id", deleteDoctor);
router.post("/:id/rating", validateRating, addDoctorRating);
router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  signInDoctor
);
router.put(
  "/updateprofile/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("contactNo").notEmpty().withMessage("Contact number is required"),
  ],
  updateProfile
);
router.put(
  "/updatepassword/:id",
  [body("password").notEmpty().withMessage("Password is required")],
  updatePassword
);
// localhost:5000/api/doctor/forgetpassword
http: router.post(
  "/forgetpassword",
  [body("email").isEmail().withMessage("Email is invalid")],
  forgetPassword
);
router.post(
  "/verifyotp",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be 6 digits long"),
  ],
  verifyOTP
);
router.patch(
  "/setnewpassword",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  setNewPassword
);
router.get("/viewprofile/:id", viewDoctorProfile);

export default router;
