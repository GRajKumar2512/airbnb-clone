import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/register", {
        username,
        email,
        password,
      });

      alert("Registration successful");
    } catch (error) {
      alert("Registration failed");
    }
  }

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-40">
        <h1 className="font-bold mb-4 text-primary text-center text-3xl">
          REGISTER
        </h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="xyz@mail.com"
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
            Register
          </button>
          <div className="mt-3 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
