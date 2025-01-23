import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      // unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"], // Email validation
    },
    phone: {
      // Use 'phone'
      type: String,
      // required: true,
    },
    subject: {
      // Use 'subject'
      type: String,
      // required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", ContactSchema);
