import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userInfo) => {
      if (err) throw err;

      res.json(userInfo);
    });
  } else {
    res.json("No token found");
  }

  res.json({ token });
});

export default router;
