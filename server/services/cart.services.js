import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

class CartService {
  static async addItemToCart(userId, productId, quantity) {
    try {
      const product = await Product.findById(productId);
      if (!product) throw new Error("Product not found");

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const existingItem = cart.items.find((item) =>
        item.productId.equals(productId)
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price = product.price * existingItem.quantity;
      } else {
        const item = {
          productId,
          quantity,
          price: product.price * quantity,
        };
        cart.items.push(item);
      }

      cart.updatedAt = Date.now();
      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCartByUserId(userId) {
    try {
      return await Cart.findOne({ userId }).populate("items.productId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async removeItemFromCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error("Cart not found");

      cart.items = cart.items.filter(
        (item) => !item.productId.equals(productId)
      );
      cart.updatedAt = Date.now();
      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateItemQuantity(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error("Cart not found");

      const item = cart.items.find((item) => item.productId.equals(productId));
      if (!item) throw new Error("Item not found in cart");

      item.quantity = quantity;
      item.price = (item.quantity * item.price) / item.quantity; // Update price based on the new quantity
      cart.updatedAt = Date.now();
      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async clearCart(userId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error("Cart not found");

      cart.items = [];
      cart.updatedAt = Date.now();
      return await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CartService;
