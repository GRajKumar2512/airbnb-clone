import React, { useState } from "react";
import Perks from "./Perks";
import axios from "axios";
import { Navigate } from "react-router-dom";

const PlacesForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(null);

  function preInputHeaders(title, description) {
    return (
      <>
        <h2 className="text-2xl mt-4">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </>
    );
  }

  async function addPhotoByLink(event) {
    event.preventDefault();

    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(event) {
    const files = event.target.files;
    const data = new FormData();

    // append the formdata with all the selected files
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    // send the form data to the /upload endpoint
    const { data: filenames } = await axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // set the response data to the use state photos array list
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", data);
    setRedirect("/account/places");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        {preInputHeaders(
          "Title",
          "title for your place, should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          placeholder="for example: My Lovely apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Address */}
        {preInputHeaders("Address", "address to this place")}
        <input
          type="text"
          placeholder="H.No / street / area / city / country"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Photos */}
        {preInputHeaders("Photos", "more = better")}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="add using a link... "
            className="w-4/6"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            className="bg-gray-300  px-4 py-2 rounded-lg w-2/6"
            onClick={addPhotoByLink}
          >
            Add photo
          </button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <label className="p-8 border bg-transparent rounded-lg cursor-pointer flex items-center justify-center gap-1">
            <input type="file" className="hidden" onChange={uploadPhoto} />
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
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload
          </label>
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="object-contain" key={link}>
                <img
                  src={`http://localhost:4000/uploads/${link}`}
                  alt="image"
                  className="rounded-lg h-40 w-full"
                />
              </div>
            ))}
        </div>

        {/* Description */}
        {preInputHeaders("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Perks */}
        <Perks selected={perks} onChange={setPerks} />

        {/* Extra info */}
        {preInputHeaders("Extra Info", "house rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {/* check in-out times */}
        {preInputHeaders(
          "Check in & out times, max guests",
          "Remember to have a time window to clean rooms"
        )}
        <div className="grid sm:grid-cols-3 gap-2 mt-2">
          <div>
            <h3>Check In time</h3>
            <input
              type="number"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3>Check Out time</h3>
            <input
              type="number"
              placeholder="14:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3>Max Guests</h3>
            <input
              type="number"
              placeholder="4"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesForm;
