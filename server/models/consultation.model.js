import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema({
  name: String,
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  consultationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  phoneNo: String,
  message: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Consultation = mongoose.model("Consultation", ConsultationSchema);
