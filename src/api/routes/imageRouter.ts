import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { imageService } from "../../domain/image/ImageService";
import { NoFileError } from "../../errors/NoFileError";
import { upload } from "../../config/multer";

const imageRouter = express.Router();
imageRouter.use(authMiddleware);

imageRouter.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) throw new NoFileError();
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
