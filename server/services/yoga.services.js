import { Yoga } from "../models/yoga.model.js";
import { Category } from "../models/category.model.js";

class YogaService {
  static async createYoga(yogaData) {
    try {
      const newYoga = new Yoga(yogaData);
      return await newYoga.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllYoga() {
    try {
      return await Yoga.find().populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getYogaById(id) {
    try {
      return await Yoga.findById(id).populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateYoga(id, yogaData) {
    try {
      return await Yoga.findByIdAndUpdate(id, yogaData, { new: true }).populate(
        "categoryname"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteYoga(id) {
    try {
      return await Yoga.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addInBulk(yogaList) {
    try {
      return await Yoga.insertMany(yogaList);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getYogaByCategory(categoryId) {
    try {
      return await Yoga.find({ categoryname: categoryId }).populate(
        "categoryname"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getYogaByCategoryName(categoryName) {
    try {
      const category = await Category.findOne({ categoryName });
      if (!category) {
        throw new Error("Category not found");
      }
      return await Yoga.find({ categoryId: category._id }).populate(
        "categoryname"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getYogaByName(yogaName) {
    try {
      return await Yoga.find({ yogaName: new RegExp(yogaName, "i") }).populate(
        "categoryname"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default YogaService;
