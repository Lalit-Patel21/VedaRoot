import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  stock: { type: Number },
  rating: Number,
  imageUrl: String,
  categoryname: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  brand: String,
  tags: [String],
});
export const Product = mongoose.model("Product", ProductSchema);
