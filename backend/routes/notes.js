// backend/routes/notes.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import Note from "../models/Note.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(notes);
});

router.post("/", verifyToken, async (req, res) => {
  const { content } = req.body;
  const note = new Note({ user: req.userId, content });
  await note.save();
  res.json(note);
});

router.put("/:id", verifyToken, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { content: req.body.content },
    { new: true }
  );
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Note deleted" });
});

export default router;
