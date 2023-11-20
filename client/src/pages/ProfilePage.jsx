import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  async function handleLogOut() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="mt-10 flex grow flex-col justify-center items-center min-h-full gap-4 max-w-lg mx-auto">
      <h2 className="font-bold text-xl text-gray-600">
        Logged in as <span className="text-primary">"{user.username}"</span>{" "}
        with (<span className="text-primary">{user.email}</span>)
      </h2>
      <button
        onClick={handleLogOut}
        className="bg-primary text-white px-6 py-2 rounded-full w-full"
      >
        logout
      </button>
    </div>
  );
};

export default ProfilePage;
