import express from "express";
import Place from "../models/Place.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// GET ROUTE - USER SPECIFIC UPLOADS
router.get("/", (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;

      const { id } = userInfo;

      const placesData = await Place.find({ owner: id });

      return res.status(200).json(placesData);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to send the user specific upload" });
  }
});

// POST ROUTE - ANYONE CAN POST
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
    price,
  } = req.body;

  try {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;

      const placeDoc = await Place.create({
        owner: userInfo.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      return res.status(200).json(placeDoc);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to upload the places data in DB" });
  }
});

// ID ROUTE - PLACE WITH THE ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const placeDoc = await Place.findById(id);

    return res.status(200).json(placeDoc);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to return the place detail with given id" });
  }
});

export default router;

// PUT ROUTE - UPDATE PLACE WITH THE ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.cookies;
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
      price,
    } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;

      const placeDoc = await Place.findById(id);
      if (userInfo.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });

        await placeDoc.save();

        res.status(200).json({ message: "successful" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "post update was failed" });
  }
});
