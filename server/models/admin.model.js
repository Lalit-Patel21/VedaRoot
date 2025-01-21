import mongoose from "mongoose";

const OtpInfoSchema = new mongoose.Schema({
  code: { type: String },
  expiry: { type: Date },
});

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    otpInfo: { type: OtpInfoSchema, default: {} }, // Add this nested schema
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", AdminSchema);
