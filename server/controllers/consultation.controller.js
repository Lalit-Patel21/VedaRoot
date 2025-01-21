import { validationResult } from "express-validator";
import ConsultationService from "../services/consultation.services.js";

export const scheduleConsultation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await ConsultationService.scheduleConsultation(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserConsultations = async (req, res) => {
  try {
    const result = await ConsultationService.getUserConsultations(
      req.params.userId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctorConsultations = async (req, res) => {
  try {
    const result = await ConsultationService.getDoctorConsultations(
      req.params.doctorId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConsultationById = async (req, res) => {
  try {
    const result = await ConsultationService.getConsultationById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConsultationDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await ConsultationService.updateConsultationDetails(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
