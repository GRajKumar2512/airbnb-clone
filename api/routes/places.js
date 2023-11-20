import express from "express";
import Place from "../models/Place.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// GET ROUTE
router.get("/", (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
    if (err) throw err;

    const { id } = userInfo;

    const placesData = await Place.find({ owner: id });

    return res.json(placesData);
  });
});

// POST ROUTE
router.post("/", async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  try {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;

      const placeDoc = await Place.create({
        owner: userInfo.id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });

      return res.status(200).json(placeDoc);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
