import express from "express";
import { body } from "express-validator";
import {
  createHomeRemedy,
  getAllHomeRemedies,
  getHomeRemedyById,
  updateHomeRemedy,
  deleteHomeRemedy,
  addInBulk,
  getHomeRemedyByCategoryId,
  getHomeRemedyByCategoryName,
  getHomeRemedyByName,
} from "../controllers/homeRemedy.controller.js";

const router = express.Router();

// Validation rules
const validateHomeRemedy = [
  body("remedyName").notEmpty().withMessage("Home remedy name is required"),
  body("ingredients").isArray().withMessage("Ingredients must be an array"),
  body("description").notEmpty().withMessage("Description is required"),
  body("instructions").isArray().withMessage("Instructions must be an array"),
  // body("categoryId")
  //   .isMongoId()
  //   .withMessage("Category ID must be a valid ObjectId"),
];

// Define routes for home remedy operations
router.post("/", validateHomeRemedy, createHomeRemedy);
router.get("/", getAllHomeRemedies);
router.get("/:id", getHomeRemedyById);
router.put("/:id", validateHomeRemedy, updateHomeRemedy);
router.delete("/:id", deleteHomeRemedy);
router.post("/addinbulk", addInBulk); // Bulk addition of  HomeRemedy HomeRemedy items
router.get("/homeRemedybycategoryId/:categoryId", getHomeRemedyByCategoryId); // Get HomeRemedy by category ID
router.get(
  "/HomeRemedybycategoryName/:categoryName",
  getHomeRemedyByCategoryName
); // Get HomeRemedy by category name
router.get("/searchyogaHomeRemedybyname/:HomeRemedyname", getHomeRemedyByName); // Search HomeRemedy by name

export default router;
