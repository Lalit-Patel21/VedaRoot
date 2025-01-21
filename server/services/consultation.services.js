import { Consultation } from "../models/consultation.model.js";

class ConsultationService {
  static async scheduleConsultation(consultationData) {
    try {
      const newConsultation = new Consultation(consultationData);
      return await newConsultation.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserConsultations(userId) {
    try {
      return await Consultation.find({ userId });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getDoctorConsultations(doctorId) {
    try {
      return await Consultation.find({ doctorId });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getConsultationById(id) {
    try {
      return await Consultation.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateConsultationDetails(id, updateData) {
    try {
      return await Consultation.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ConsultationService;
