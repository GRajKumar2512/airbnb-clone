import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const placeInfo = await Place.findById(id);
    console.log(placeInfo);

    return res.status(200).json(placeInfo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
