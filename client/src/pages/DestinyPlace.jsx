import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const DestinyPlace = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;

    const placeDetails = async () => {
      const { data } = await axios.get(`/place/${id}`);

      setPlace(data);
    };

    placeDetails();
  }, []);

  if (!place) return "Loading...";

  return (
    <div className="mt-4 max-w-[1024px] mx-auto p-8">
      <h1 className="text-3xl font-semibold">{place.title}</h1>

      <div className="grid grid-cols-2 mt-8 gap-2 rounded-3xl overflow-hidden">
        <div>
          <img
            className="aspect-square object-cover"
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            alt="image"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <img
            className="aspect-square object-cover"
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            alt="image"
          />
          <img
            className="aspect-square object-cover"
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            alt="image"
          />
          <img
            className="aspect-square object-cover"
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            alt="image"
          />
          <img
            className="aspect-square object-cover"
            src={`http://localhost:4000/uploads/${place.photos[0]}`}
            alt="image"
          />
        </div>
      </div>

      <a
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
        className="font-semibold block underline text-2xl mt-4"
      >
        {place.address}
      </a>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <div className="my-4 border-b pb-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p>{place.description}</p>
          </div>
          <div className="my-4 border-b pb-4">
            <span className="font-semibold ">Check-in:</span> {place.checkIn}{" "}
            <br />
            <span className="font-semibold ">Check-Out:</span> {place.checkOut}{" "}
            <br />
            <span className="font-semibold ">Max number of guests:</span>{" "}
            {place.maxGuests}
          </div>
          <div className="my-4 border-b pb-4">
            <h2 className="text-xl font-semibold">Extra Info:</h2>
            <p className="text-sm mb-4 mt-1 leading-6">{place.extraInfo}</p>
          </div>
        </div>
        <BookingWidget place={place} id={id} />
      </div>
    </div>
  );
};

export default DestinyPlace;
