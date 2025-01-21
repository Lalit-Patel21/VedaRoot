import { validationResult } from "express-validator";
import { Category } from "../models/category.model.js";
import HomeRemedyService from "../services/homeRemedy.services.js";

export const createHomeRemedy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const result = await HomeRemedyService.createHomeRemedy(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllHomeRemedies = async (req, res) => {
  try {
    const result = await HomeRemedyService.getAllHomeRemedies();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHomeRemedyById = async (req, res) => {
  try {
    const result = await HomeRemedyService.getHomeRemedyById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHomeRemedy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await HomeRemedyService.updateHomeRemedy(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHomeRemedy = async (req, res) => {
  try {
    const result = await HomeRemedyService.deleteHomeRemedy(req.params.id);
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
    const homeRemediesWithCategoryIds = await Promise.all(
      req.body.map(async (homeRemedy) => {
        const categoryId = await createCategoryIfNotExist(
          homeRemedy.categoryname,
          "Causes for Home Remedy Category", // Provide relevant details
          "Precautions for Home Remedy Category", // Provide relevant details
          "URL for Home Remedy Category image" // Provide relevant image URL
        );
        return { ...homeRemedy, categoryname: categoryId };
      })
    );

    const result = await HomeRemedyService.addInBulk(
      homeRemediesWithCategoryIds
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHomeRemedyByCategoryId = async (req, res) => {
  try {
    const result = await HomeRemedyService.getHomeRemedyByCategoryId(
      req.params.categoryId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHomeRemedyByCategoryName = async (req, res) => {
  try {
    const result = await HomeRemedyService.getHomeRemedyByCategoryName(
      req.params.categoryName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHomeRemedyByName = async (req, res) => {
  try {
    const result = await HomeRemedyService.getHomeRemedyByName(
      req.params.HomeRemedyname
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
