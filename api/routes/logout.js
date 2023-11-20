import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.cookie("token", "").json({ message: "Logout successful" });
});

export default router;
