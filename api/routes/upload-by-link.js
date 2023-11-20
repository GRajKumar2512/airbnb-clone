import express from "express";
import download from "image-downloader";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url); // returns the converted path of the module file's url
const __dirname = dirname(__filename); // returns the directory name of the path

router.post("/", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const uploadPath = join(__dirname, "../uploads", newName); // join() constructs the correct path  to the destination

  try {
    await download.image({
      url: link,
      dest: uploadPath,
    });

    res.json(newName);
  } catch (error) {
    console.error("error dowloading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
