import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  appointmentDateTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  phoneNo: String,
  name: String,
  age: Number,
  gender: String,
  email: String,
});

export const Appointment = mongoose.model("Appointment", AppointmentSchema);
