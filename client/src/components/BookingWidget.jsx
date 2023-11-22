import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingWidget = ({ place, id }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(place.maxGuests);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState(null);

  let NumberOfDays = 0;

  if (checkIn && checkOut) {
    NumberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  let cleaningFee = 200;

  const roomCharge = place.price * NumberOfDays;

  const airbnbFee = Math.ceil(roomCharge * 0.15);

  const totalFee = roomCharge + cleaningFee * NumberOfDays + airbnbFee;

  async function bookThisPlace() {
    const { data } = await axios.post("/booking", {
      placeID: id,
      checkIn,
      checkOut,
      guests,
      name,
      mobile,
      price: totalFee,
    });

    const bookingID = data._id;
    setRedirect("/account/bookings");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl py-4 px-4 h-fit">
      <div className="mb-4">
        <span className="font-bold text-xl">₹ {place.price}</span> night
      </div>
      <div className="rounded-xl border">
        <div className="flex">
          <div className="p-4 border-r">
            <label>Check In:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className=" p-4 ">
            <label>Check Out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="p-4 border-t flex gap-2 items-center">
          <label>Guests: </label>
          <input
            type="Number"
            value={guests}
            onChange={(ev) => setGuests(ev.target.value)}
          />
        </div>
        {NumberOfDays > 0 && (
          <div>
            <div className="p-4 border-t flex gap-2 items-center">
              <label>Name: </label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="p-4 border-t flex gap-2 items-center">
              <label>Mobile: </label>
              <input
                type="tel"
                placeholder="Your Mobile Number"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <button
        onClick={bookThisPlace}
        className="bg-primary text-white px-4 py-1 rounded-lg w-full mt-4"
      >
        Book Now
      </button>
      {NumberOfDays > 0 && (
        <div>
          <div className="flex justify-between mt-4">
            <p>
              ₹{place.price} x {NumberOfDays} night
            </p>
            <p>₹ {roomCharge}</p>
          </div>
          <div className="flex justify-between mt-4">
            <p>Cleaning fee</p>
            <p>₹ {cleaningFee}</p>
          </div>
          <div className="flex justify-between mt-4">
            <p>AirB&B Service fee</p>
            <p>₹ {airbnbFee}</p>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t">
            <p className="font-semibold">Total before taxes</p>
            <p className="font-semibold">₹ {totalFee}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingWidget;
