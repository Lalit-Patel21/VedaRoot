import express from "express";
import { body } from "express-validator";
import {
  createYoga,
  getAllYoga,
  getYogaById,
  updateYoga,
  deleteYoga,
  addInBulk,
  getYogaByCategory,
  getYogaByCategoryName,
  getYogaByName,
} from "../controllers/yoga.controller.js";

const router = express.Router();

// Validation rules
const validateYoga = [
  body("yogaName").notEmpty().withMessage("Yoga name is required"),
  body("benefits").isArray().withMessage("Benefits must be an array"),
  body("instructions").isArray().withMessage("Instructions must be an array"),
];

// Define routes for yoga operations
router.post("/", validateYoga, createYoga);
router.get("/", getAllYoga);
router.get("/:id", getYogaById);
router.put("/:id", validateYoga, updateYoga);
router.delete("/:id", deleteYoga);
router.post("/addinbulk", addInBulk); // Bulk addition of Yoga items
router.get("/yogabycategory/:categoryId", getYogaByCategory); // Get Yoga by category ID
router.get("/yogabycategoryName/:categoryName", getYogaByCategoryName); // Get Yoga by category name
router.get("/searchyogabyname/:yoganame", getYogaByName); // Search Yoga by name

export default router;
