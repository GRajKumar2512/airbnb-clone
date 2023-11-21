import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.json({ message: "email doesn't exist, register instead" });

    const isPassValid = bcrypt.compareSync(password, existingUser.password);

    if (!isPassValid)
      return res.status(400).json({ message: "invalid password" });

    jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        username: existingUser.username,
      },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;

        res.cookie("token", token).json(existingUser);
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
