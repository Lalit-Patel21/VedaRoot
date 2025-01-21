import { Disease } from "../models/disease.model.js";

class DiseaseService {
  static async createDisease(diseaseData) {
    try {
      const newDisease = new Disease(diseaseData);
      return await newDisease.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllDiseases() {
    try {
      return await Disease.find().populate("categoryId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getDiseaseById(id) {
    try {
      return await Disease.findById(id).populate("categoryId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateDisease(id, diseaseData) {
    try {
      return await Disease.findByIdAndUpdate(id, diseaseData, {
        new: true,
      }).populate("categoryId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteDisease(id) {
    try {
      return await Disease.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addInBulk(diseaseDataArray) {
    try {
      return await Disease.insertMany(diseaseDataArray);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getDiseasesByCategory(categoryId) {
    try {
      return await Disease.find({ categoryId }).populate("categoryId");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async searchDiseaseByName(diseaseName) {
    try {
      return await Disease.find({
        diseaseName: new RegExp(diseaseName, "i"),
      }).populate("categoryId");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default DiseaseService;
