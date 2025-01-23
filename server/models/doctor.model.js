import mongoose from "mongoose";
import bcrypt from "bcrypt";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "is invalid"], // Email validation
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "is invalid"], // Phone number validation (example: 10 digits)
  },

  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  // gender: {
  //   type: String,
  // },

  lastLogin: { type: Date, default: Date.now },
  gender: { type: String, enum: ["Male", "Female", "Other"] },

  registrationNumber: { type: String, unique: true },
  specialization: String,
  details: {
    time: String,
    qualification: String,
    experience: Number,
    consultationFee: Number,
    clinicAddress: String,
    consultationFee: Number,
    availability: [String],
    doctorimage: String,
    gender: String,
    bio: String,
  },
});

// Encrypt password before saving the doctor document
DoctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const Doctor = mongoose.model("Doctor", DoctorSchema);
