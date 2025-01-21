import { Appointment } from "../models/appointment.model.js";

class AppointmentService {
  static async bookAppointment(appointmentData) {
    try {
      const newAppointment = new Appointment(appointmentData);
      return await newAppointment.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserAppointments(userId) {
    try {
      return await Appointment.find({ userId });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getDoctorAppointments(doctorId) {
    try {
      return await Appointment.find({ doctorId });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAppointmentById(id) {
    try {
      return await Appointment.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateAppointmentStatus(id, status) {
    try {
      return await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteAppointment(id) {
    try {
      return await Appointment.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AppointmentService;
