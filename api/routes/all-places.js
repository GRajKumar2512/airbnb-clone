import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allData = await Place.find();

    return res.status(200).json(allData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
