// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Upload profile picture
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

import { verifyToken } from "./middleware/verifyToken.js";
app.post("/api/upload/profile-picture", verifyToken, upload.single("profilePicture"), async (req, res) => {
  const user = await mongoose.model("User").findByIdAndUpdate(
    req.userId,
    { profilePicture: `/uploads/profile/${req.file.filename}` },
    { new: true }
  );
  res.json({ profilePicture: user.profilePicture });
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5050, () => console.log("Server running on http://localhost:5050")))
  .catch((err) => console.error(err));
