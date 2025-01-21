import mongoose from "mongoose";
const HomeRemedySchema = new mongoose.Schema(
  {
    remedyName: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String], // List of ingredients required for the remedy
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: [String], // Steps to prepare the remedy
      required: true,
    },
    imageUrl: {
      type: String, // URL of the remedy's image
      required: false,
    },
    caution: {
      type: String, // Any cautionary details
    },
    categoryname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Foreign Key reference to Category
      required: true,
    },
  },
  { timestamps: true }
);
export const HomeRemedy = mongoose.model("HomeRemedy", HomeRemedySchema);
