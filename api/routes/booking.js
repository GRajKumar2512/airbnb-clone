import express from "express";
import Booking from "../models/Booking.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;

      const bookingsData = await Booking.find({ userID: userInfo.id }).populate(
        "placeID"
      );

      return res.status(200).json(bookingsData);
    });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  const { placeID, checkIn, checkOut, guests, name, mobile, price } = req.body;
  const { token } = req.cookies;

  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;

      const newBooking = new Booking({
        placeID,
        userID: userInfo.id,
        checkIn,
        checkOut,
        guests,
        name,
        mobile,
        price,
      });

      await newBooking.save();

      return res.status(200).json(newBooking);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
