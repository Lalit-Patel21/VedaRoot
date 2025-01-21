import express from "express";
import { body } from "express-validator";
import {
  createUser,
  signInUser,
  forgotPassword,
  verifyOTP,
  setNewPassword,
  updateUser,
  deleteUser,
  updatepassword,
  getAllUsers,
  getUserById,
  viewUserByEmail,
  uploadUserImage,
} from "../controllers/user.controller.js";

const router = express.Router();

// Validation rules
const validateUser = [
  body("userName").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required and should be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
];

const validateSignIn = [
  body("email").isEmail().withMessage("Email is required and should be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
];

// Define routes for user operations
http: router.post("/", validateUser, createUser);
router.post("/signIn", validateSignIn, signInUser);
router.post(
  "/forgotPassword",
  body("email", "invalid email").isEmail().notEmpty(),
  forgotPassword
);
router.post(
  "/verifyOTP",
  body("email", "invalid email").isEmail().notEmpty(),
  body("otp", "invalid OTP").notEmpty(),
  verifyOTP
);
router.put(
  "/setNewPassword",
  body("email", "invalid email").isEmail().notEmpty(),
  body("password", "invalid password").notEmpty(),
  setNewPassword
);

router.patch(
  "/updatepassword",
  body("id", "invalid id").notEmpty(),
  body("oldpassword", "invalid password").notEmpty(),
  body("newpassword", "invalid password").notEmpty(),
  updatepassword
);

router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/viewUserByEmail/:email", viewUserByEmail);
router.post("/uploadImage/:id", uploadUserImage);

export default router;

// // Define routes for user operations
// router.post(
//   "/forgetpassword",
//   [body("email").isEmail().withMessage("Email is invalid")],
//   forgotPassword
// );
// router.post(
//   "/verifyotp",
//   [
//     body("email").isEmail().withMessage("Email is invalid"),
//     body("otp")
//       .isLength({ min: 6, max: 6 })
//       .withMessage("OTP must be 6 digits long"),
//   ],
//   verifyOTP
// );
// router.put(
//   "/setnewpassword",
//   [
//     body("email").isEmail().withMessage("Email is invalid"),
//     body("password").notEmpty().withMessage("Password is required"),
//   ],
//   setNewPassword
// );
