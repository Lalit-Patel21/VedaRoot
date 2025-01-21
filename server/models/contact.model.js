import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    // contactId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   default: () => new mongoose.Types.ObjectId(),
    //   unique: true,
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Foreign Key reference to User
      required: true,
      index: true,
    },
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
    phoneNo: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "is invalid"], // Phone number validation (example: 10 digits)
    },
    subjectOfInquiry: {
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
