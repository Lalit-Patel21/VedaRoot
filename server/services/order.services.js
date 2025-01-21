import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

class OrderService {
  static async createOrder(orderData) {
    try {
      // Find the cart for the user
      const cart = await Cart.findOne({ userId: orderData.userId }).populate(
        "items.productId"
      );
      if (!cart) throw new Error("Cart not found for the user");
      // Calculate total amount
      let totalAmount = 0;
      cart.items.forEach((item) => {
        totalAmount += item.price;
      });
      // Create order items from cart items
      const orderItems = cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price,
        discount: item.productId.discountPrice || 0,
      }));

      // Create a new order
      const newOrder = new Order({
        userId: orderData.userId,
        shippingAddress: orderData.shippingAddress,
        city: orderData.city,
        state: orderData.state,
        fullName: orderData.fullName,
        userContact: orderData.userContact,
        pinCode: orderData.pinCode,
        totalAmount: totalAmount,
        items: orderItems,
      });

      // Save the order
      const savedOrder = await newOrder.save();

      // Clear the user's cart
      cart.items = [];
      await cart.save();

      return savedOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOrderById(orderId) {
    try {
      return await Order.findById(orderId).populate("items.productId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOrdersByUserId(userId) {
    try {
      return await Order.find({ userId }).populate("items.productId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteOrder(orderId) {
    try {
      return await Order.findByIdAndDelete(orderId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default OrderService;
