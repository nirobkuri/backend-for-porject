import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import blogRoutes from "./routes/blog.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/users", userRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
