import mongoose from "mongoose";

const DiseaseSchema = new mongoose.Schema({
  diseaseName: { type: String, required: true },
  description: String,
  symptoms: [String],
  causes: [String],
  treatment: [String],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  precautions: [String],
  imageUrl: String,
});
export const Disease = mongoose.model("Disease", DiseaseSchema);
