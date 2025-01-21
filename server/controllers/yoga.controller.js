import { validationResult } from "express-validator";
import YogaService from "../services/yoga.services.js";
import { Category } from "../models/category.model.js";

export const createYoga = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await YogaService.createYoga(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllYoga = async (req, res) => {
  try {
    const result = await YogaService.getAllYoga();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getYogaById = async (req, res) => {
  try {
    const result = await YogaService.getYogaById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateYoga = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await YogaService.updateYoga(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteYoga = async (req, res) => {
  try {
    const result = await YogaService.deleteYoga(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create category if it does not exist
const createCategoryIfNotExist = async (
  categoryName,
  causes,
  precaution,
  imageUrl
) => {
  let category = await Category.findOne({ categoryName });
  if (!category) {
    category = new Category({
      categoryName,
      Causes: causes,
      Precaution: precaution,
      imageUrl,
    });
    await category.save();
  }
  return category._id;
};

export const addInBulk = async (req, res) => {
  try {
    const yogaWithCategoryIds = await Promise.all(
      req.body.map(async (yoga) => {
        const categoryId = await createCategoryIfNotExist(
          yoga.categoryname,
          "Causes for Yoga Category", // Provide relevant details
          "Precautions for Yoga Category", // Provide relevant details
          "URL for Yoga Category image" // Provide relevant image URL
        );
        return { ...yoga, categoryname: categoryId };
      })
    );

    const result = await YogaService.addInBulk(yogaWithCategoryIds);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getYogaByCategory = async (req, res) => {
  try {
    const result = await YogaService.getYogaByCategory(req.params.categoryId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getYogaByCategoryName = async (req, res) => {
  try {
    const result = await YogaService.getYogaByCategoryName(
      req.params.categoryName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getYogaByName = async (req, res) => {
  try {
    const result = await YogaService.getYogaByName(req.params.yoganame);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
