import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);

      alert("Login successful !");

      setRedirect(true);
    } catch (error) {
      alert("Login failed !");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="font-bold mb-4 text-primary text-center text-3xl">
          LOGIN
        </h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-primary text-white w-full"
          >
            Login
          </button>
          <div className="mt-3 text-center">
            Don't have an account yet?{" "}
            <Link to={"/register"} className="text-primary">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
