import express from "express";
import { check } from "express-validator";
import {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post(
  "/",
  [
    check("userId").notEmpty().withMessage("User ID is required"),
    check("doctorId").notEmpty().withMessage("Doctor ID is required"),
    check("appointmentDateTime")
      .notEmpty()
      .withMessage("Appointment date and time is required"),
  ],
  bookAppointment
);

router.get("/user/:userId", getUserAppointments);
router.get("/doctor/:doctorId", getDoctorAppointments);
router.get("/:id", getAppointmentById);

router.put(
  "/:id",
  [
    check("status")
      .isIn(["Pending", "Confirmed", "Cancelled"])
      .withMessage("Invalid status"),
  ],
  updateAppointmentStatus
);

router.delete("/:id", deleteAppointment);

export default router;
