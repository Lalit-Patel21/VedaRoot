import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Foreign Key reference to User
    //   required: true,
    //   index: true,
    // },
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
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"], // Email validation
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: ["open", "in progress", "resolved"], // Possible statuses
    //   default: "open",
    //   index: true,
    // },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", ContactSchema);
