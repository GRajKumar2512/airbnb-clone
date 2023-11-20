import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import fs from "fs";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadPath = join(__dirname, "../uploads/"); // returns the correct path

// this middleware downloads the files and uploads them to a specific destination route.
const photosMiddleware = multer({ dest: uploadPath });
router.post("/", photosMiddleware.array("photos", 10), (req, res) => {
  const uploadedFiles = [];

  try {
    // a lengthy process just to add image extension to the path
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, destination } = req.files[i];
      const parts = originalname.split(".");
      const extOfImg = parts[parts.length - 1];
      const newPath = path + "." + extOfImg;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace(destination, ""));
    }
    res.json(uploadedFiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
