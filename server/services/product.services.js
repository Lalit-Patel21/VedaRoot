import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";

class ProductService {
  static async createProduct(productData) {
    try {
      const newProduct = new Product(productData);
      return await newProduct.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllProducts() {
    try {
      return await Product.find().populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getProductById(id) {
    try {
      return await Product.findById(id).populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateProduct(id, productData) {
    try {
      return await Product.findByIdAndUpdate(id, productData, {
        new: true,
      }).populate("categoryId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async saveInBulk(products) {
    try {
      return await Product.insertMany(products);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getProductByName(productName) {
    try {
      return await Product.findOne({ productName }).populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async getProductsByCategoryName(categoryName) {
    try {
      const category = await Category.findOne({ categoryName });
      if (!category) {
        throw new Error("Category not found");
      }
      return await Product.find({ categoryId: category._id }).populate(
        "categoryname"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getProductsByCategoryId(categoryId) {
    try {
      return await Product.find({ categoryId }).populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductService;
