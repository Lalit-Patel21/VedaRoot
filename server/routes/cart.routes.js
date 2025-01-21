import express from "express";
import { body } from "express-validator";
import {
  addItemToCart,
  getCartByUserId,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// Import isValidObjectId to validate ObjectIds
import { isValidObjectId } from "mongoose";

// Validation rules
const validateCart = [
  body("userId")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid user ID"),
  body("productId")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid product ID"),
  body("quantity").isNumeric().withMessage("Quantity must be a number"),
];

// Define routes for cart operations
router.post("/add", validateCart, addItemToCart);
router.get("/:userId", getCartByUserId);
router.post(
  "/remove",
  body("userId")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid user ID"),
  body("productId")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid product ID"),
  removeItemFromCart
);
router.patch(
  "/update",
  body("userId")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid user ID"),
  body("productId")
    .custom((value) => isValidObjectId(value))
    .withMessage("Invalid product ID"),
  body("quantity").isNumeric().withMessage("Quantity must be a number"),
  updateItemQuantity
);
router.delete("/clear/:userId", clearCart);

export default router;
