import { Schema, model } from "mongoose";

const BookingSchema = new Schema({
  placeID: { type: Schema.Types.ObjectId, required: true, ref: "Place" },
  userID: { type: Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  price: { type: Number },
});

export default model("Booking", BookingSchema);
