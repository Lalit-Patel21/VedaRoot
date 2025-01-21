import { validationResult } from "express-validator";
import DiseaseService from "../services/disease.services.js";

export const createDisease = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await DiseaseService.createDisease(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDiseases = async (req, res) => {
  try {
    const result = await DiseaseService.getAllDiseases();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDiseaseById = async (req, res) => {
  try {
    const result = await DiseaseService.getDiseaseById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDisease = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await DiseaseService.updateDisease(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDisease = async (req, res) => {
  try {
    const result = await DiseaseService.deleteDisease(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addInBulk = async (req, res) => {
  try {
    const result = await DiseaseService.addInBulk(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDiseasesByCategory = async (req, res) => {
  try {
    const result = await DiseaseService.getDiseasesByCategory(
      req.params.categoryId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchDiseaseByName = async (req, res) => {
  try {
    const result = await DiseaseService.searchDiseaseByName(
      req.params.diseaseName
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
