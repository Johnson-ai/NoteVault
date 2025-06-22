// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import { verifyToken } from "./middleware/verifyToken.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Upload profile picture logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/profile";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.post(
  "/api/upload/profile-picture",
  verifyToken,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const User = mongoose.model("User");
      const user = await User.findByIdAndUpdate(
        req.userId,
        { profilePicture: `/uploads/profile/${req.file.filename}` },
        { new: true }
      );
      res.json({ profilePicture: user.profilePicture });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Database connection and server start
const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.error("MongoDB connection error:", err));
