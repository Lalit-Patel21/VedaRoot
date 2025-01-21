import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    contactNumber: { type: String, unique: true },
    address: String,
    city: String,
    state: String,
    pinCode: String,
    lastLogin: { type: Date, default: Date.now },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", UserSchema);
