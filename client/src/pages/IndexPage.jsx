import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    const getPlaces = async () => {
      const { data } = await axios.get("/all-places");

      setAllPlaces(data);
    };

    getPlaces();
  }, []);

  if (!allPlaces) return "loading...";

  return (
    <div className="mt-4 mx-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {allPlaces.length > 0 &&
        allPlaces.map((place, index) => (
          <Link
            to={`/place/${place._id}`}
            className="p-2 flex flex-col items-start cursor-pointer custom__animate"
            key={`${place.title}-${index}`}
          >
            {place.photos?.[0] && (
              <img
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt="img"
                className="rounded-2xl aspect-square"
              />
            )}
            <div className="mt-2">
              <h2 className="font-semibold">{place.title}</h2>
              <p className="text-sm text-slate-500">{place.address}</p>
              <p className="text-sm text-slate-500">1-6 Dec</p>
              <p className="mt-2">
                <span className="font-semibold">Rs {place.price}</span> night
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
