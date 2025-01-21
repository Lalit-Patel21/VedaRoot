import { Category } from "../models/category.model.js";

class CategoryService {
  static async createCategory(categoryData) {
    try {
      const newCategory = new Category(categoryData);
      return await newCategory.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllCategories() {
    try {
      return await Category.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCategoryById(id) {
    try {
      return await Category.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateCategory(id, categoryData) {
    try {
      return await Category.findByIdAndUpdate(id, categoryData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteCategory(id) {
    try {
      return await Category.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async saveInBulk(categories) {
    try {
      return await Category.insertMany(categories);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getCategoryByName(categoryName) {
    try {
      return await Category.findOne({ categoryName });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async search(query) {
    try {
      return await Category.find(query);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default CategoryService;
