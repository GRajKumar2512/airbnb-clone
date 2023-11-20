import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlacesForm from "./PlacesForm";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState();

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
        </div>
      )}
      {action === "new" && <PlacesForm />}
    </>
  );
};

export default PlacesPage;
