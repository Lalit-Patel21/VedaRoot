import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import yogaRoutes from "./routes/yoga.routes.js";
import homeRemedyRoutes from "./routes/homeRemedy.routes.js";
import diseaseRoutes from "./routes/disease.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import appointRoutes from "./routes/appointment.routes.js";
// import consultRoutes from "./routes/consult.routes.js";

import cors from "cors";
// const cors = require("cors");
// app.use(
//   cors({
//     origin: "http://localhost:5000", // Replace with your frontend origin
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

dotenv.config();
connectDB();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON data

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Application routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/yoga", yogaRoutes);
app.use("/api/homeRemedy", homeRemedyRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appoitment", appointRoutes);
// app.use("/api/consult", consultRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to VedaRoot API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
