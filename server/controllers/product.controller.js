import { validationResult } from "express-validator";
import { Category } from "../models/category.model.js";
import ProductService from "../services/product.services.js";

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await ProductService.createProduct(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await ProductService.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await ProductService.getProductById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await ProductService.updateProduct(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await ProductService.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ProductByName = async (req, res) => {
  try {
    const result = await ProductService.getProductByName(
      req.params.productName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ProductByCategoryName = async (req, res) => {
  try {
    const result = await ProductService.getProductsByCategoryName(
      req.params.categoryName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ProductByCategoryId = async (req, res) => {
  try {
    const result = await ProductService.getProductsByCategoryId(
      req.params.categoryId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveInBulk = async (req, res) => {
  try {
    const productsWithCategoryIds = await Promise.all(
      req.body.map(async (product) => {
        const category = await Category.findOne({
          categoryName: product.categoryname,
        });
        if (!category) {
          throw new Error(
            `Category with name "${product.categoryname}" does not exist.`
          );
        }
        return { ...product, categoryname: category._id };
      })
    );
    const result = await ProductService.saveInBulk(productsWithCategoryIds);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
