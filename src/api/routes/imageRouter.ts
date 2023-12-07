import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { imageService } from "../../domain/image/ImageService";
import { upload } from "../../config/multer";
import { ApiError } from "../../errors/ApiError";

const imageRouter = express.Router();
imageRouter.use(authMiddleware);

imageRouter.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) throw ApiError.NoFile();
    await imageService.uploadImage(req.body, req.file, res.locals.userId);
    res.status(200).json({ message: "Image uploaded" });
  } catch (error) {
    next(error);
  }
});

imageRouter.delete("/", async (req, res, next) => {
  try {
    await imageService.deleteImage(req.query, res.locals.userId);
    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    next(error);
  }
});

export { imageRouter };
