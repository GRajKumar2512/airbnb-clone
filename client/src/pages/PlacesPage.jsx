import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlacesForm from "./PlacesForm";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState({});

  useEffect(() => {
    const getPlaces = async () => {
      const { data } = await axios.get("/places");
      setPlaces(data);
    };

    getPlaces();
  }, []);

  return (
    <>
      {action !== "new" && (
        <div>
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-primary text-white px-4 py-2 rounded-full"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new place
            </Link>
          </div>

          <div className="mt-4 max-w-[1440px] mx-auto">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  key={place.title}
                  to={`/account/places/edit/${place._id}`}
                  className="flex gap-4 cursor-pointer bg-gray-100 p-4 rounded-xl"
                >
                  <div className="flex h-32 w-32 bg-gray-300 shrink-0">
                    {place.photos.length > 0 && (
                      <img
                        className="object-cover"
                        src={`http://localhost:4000/uploads/${place.photos[0]}`}
                        alt="image"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      {action === "new" && <PlacesForm />}
    </>
  );
};

export default PlacesPage;
