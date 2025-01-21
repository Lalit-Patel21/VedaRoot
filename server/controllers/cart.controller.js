import { validationResult } from "express-validator";
import CartService from "../services/cart.services.js";

export const addItemToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, productId, quantity } = req.body;
  try {
    const result = await CartService.addItemToCart(userId, productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const result = await CartService.getCartByUserId(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const result = await CartService.removeItemFromCart(userId, productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItemQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const result = await CartService.updateItemQuantity(
      userId,
      productId,
      quantity
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const result = await CartService.clearCart(req.params.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
