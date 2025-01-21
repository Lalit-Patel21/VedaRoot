import express from "express";
import { body } from "express-validator";
import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

// Validation rules
const validateOrder = [
  body("userId")
    .isMongoId()
    .withMessage("User ID is required and must be a valid ObjectId"),
  body("shippingAddress")
    .notEmpty()
    .withMessage("Shipping address is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("userContact").notEmpty().withMessage("User contact is required"),
  body("pinCode").notEmpty().withMessage("Pin code is required"),
];

const validateOrderStatus = [
  body("status")
    .isIn(["Pending", "Completed", "Cancelled"])
    .withMessage("Invalid status"),
];

// Define routes for order operations
router.post("/", validateOrder, createOrder);
router.get("/:id", getOrderById);
router.get("/user/:userId", getOrdersByUserId);
router.patch("/:id/status", validateOrderStatus, updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
