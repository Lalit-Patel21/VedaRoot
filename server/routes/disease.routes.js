import express from "express";
import { body } from "express-validator";
import {
  createDisease,
  getAllDiseases,
  getDiseaseById,
  updateDisease,
  deleteDisease,
  addInBulk,
  getDiseasesByCategory,
  searchDiseaseByName,
} from "../controllers/disease.controller.js";

const router = express.Router();

// Validation rules
const validateDisease = [
  body("diseaseName").notEmpty().withMessage("Disease name is required"),
  body("categoryId")
    .isMongoId()
    .withMessage("Category ID must be a valid ObjectId"),
];

// Define routes for disease operations
router.post("/", validateDisease, createDisease);
router.get("/", getAllDiseases);
router.get("/:id", getDiseaseById);
router.put("/:id", validateDisease, updateDisease);
router.delete("/:id", deleteDisease);
router.post("/addinbulk", addInBulk);
router.get("/diseasebycategory/:categoryId", getDiseasesByCategory);
router.get("/searchdiseasebyname/:diseaseName", searchDiseaseByName);

export default router;
