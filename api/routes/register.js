import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

const bcryptSalt = bcrypt.genSaltSync(6);

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
