import { HomeRemedy } from "../models/homeRemedy.model.js";

class HomeRemedyService {
  static async createHomeRemedy(homeRemedyData) {
    try {
      const newHomeRemedy = new HomeRemedy(homeRemedyData);
      return await newHomeRemedy.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllHomeRemedies() {
    try {
      return await HomeRemedy.find().populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getHomeRemedyById(id) {
    try {
      return await HomeRemedy.findById(id).populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateHomeRemedy(id, homeRemedyData) {
    try {
      return await HomeRemedy.findByIdAndUpdate(id, homeRemedyData, {
        new: true,
      }).populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteHomeRemedy(id) {
    try {
      return await HomeRemedy.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addInBulk(homeRemedyDataArray) {
    try {
      return await HomeRemedy.insertMany(homeRemedyDataArray);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getHomeRemedyByCategoryId(categoryId) {
    try {
      return await HomeRemedy.find({ categoryname: categoryId }).populate(
        "categoryname"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getHomeRemedyByCategoryName(categoryName) {
    try {
      const category = await Category.findOne({ categoryName });
      if (!category) {
        throw new Error("Category not found");
      }
      return await HomeRemedy.find({ categoryId: category._id }).populate(
        "categoryname"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getHomeRemedyByName(homeRemedyName) {
    try {
      return await HomeRemedy.find({
        homeremedyName: new RegExp(homeRemedyName, "i"),
      }).populate("categoryname");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default HomeRemedyService;
