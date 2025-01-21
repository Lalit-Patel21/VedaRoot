import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    Causes: String,
    Precaution: String,
    imageUrl: String,
  },
  { timestamps: true }
);
export const Category = mongoose.model("Category", CategorySchema);
