import express from "express";
import User from "../models/User.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Update user info: username and email
router.put("/", verifyToken, async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email)
    return res.status(400).json({ message: "Username and email required" });

  try {
    // Check if username or email is taken by other users
    const usernameExists = await User.findOne({
      username,
      _id: { $ne: req.user.id },
    });
    if (usernameExists)
      return res.status(400).json({ message: "Username already taken" });

    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });
    if (emailExists)
      return res.status(400).json({ message: "Email already in use" });

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error updating user" });
  }
});

export default router;
