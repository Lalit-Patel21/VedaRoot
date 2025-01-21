import express from "express";
import { body } from "express-validator";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  CategoryByName,
  saveInBulk,
} from "../controllers/category.controller.js";

const router = express.Router();

// Validation rules
const validateCategory = [
  body("categoryName").notEmpty().withMessage("Category name is required"),
];

// Define routes for category operations
router.post("/", validateCategory, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", validateCategory, updateCategory);
router.delete("/:id", deleteCategory);

router.post("/addinbulk", saveInBulk);
router.get("/categoryByName/:categoryName", CategoryByName);

export default router;
