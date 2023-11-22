import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import profileRoute from "./routes/profile.js";
import logoutRoute from "./routes/logout.js";
import uploadLinkRoute from "./routes/upload-by-link.js";
import uploadRoute from "./routes/upload.js";
import placesRoute from "./routes/places.js";
import allPlaceRoute from "./routes/all-places.js";
import placeRoute from "./routes/place.js";
import bookingRoute from "./routes/booking.js";

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => console.log("Database connected successfully..."))
  .catch((error) => console.log(error.message));

const __filename = fileURLToPath(import.meta.url); // converts url to path in ES Module
const __dirname = dirname(__filename);

// middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(join(__dirname, "/uploads"))); // most important step enables to display the photo on the screen

// different api routes
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/logout", logoutRoute);
app.use("/upload-by-link", uploadLinkRoute);
app.use("/upload", uploadRoute);
app.use("/places", placesRoute);
app.use("/all-places", allPlaceRoute);
app.use("/place", placeRoute);
app.use("/booking", bookingRoute);

// only for testing purpose
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(4000, () => console.log("Server is running on PORT 4000..."));
