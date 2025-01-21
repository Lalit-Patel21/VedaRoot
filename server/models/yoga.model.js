import mongoose from "mongoose";

const YogaSchema = new mongoose.Schema(
  {
    yogaName: {
      type: String,
      required: true,
      trim: true,
    },
    benefits: {
      type: [String], // List of health benefits
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // URL of the yoga image
      required: false,
    },
    videoUrl: {
      type: String, // URL of the yoga image
      required: false,
    },
    categoryname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Foreign Key reference to Category
      required: true,
    },
  },
  { timestamps: true }
);
export const Yoga = mongoose.model("Yoga", YogaSchema);
