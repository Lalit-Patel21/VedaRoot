import express from "express";
import { body } from "express-validator";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  ProductByName,
  saveInBulk,
  ProductByCategoryName,
  ProductByCategoryId,
} from "../controllers/product.controller.js";

const router = express.Router();

// Validation rules
const validateProduct = [
  body("title").notEmpty().withMessage("Product name is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
];

// Define routes for product operations
router.post("/", validateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);
router.post("/addinbulk", saveInBulk);
router.get("/productByName/:productName", ProductByName);
router.get("/allproductBycategoryName/:categoryName", ProductByCategoryName);
router.get("/allproductBycategoryId/:categoryId", ProductByCategoryId);
export default router;
