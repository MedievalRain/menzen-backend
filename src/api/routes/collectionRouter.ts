import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { collectionService } from "../../domain/collection/collectionService";

const collectionRouter = express.Router();
collectionRouter.use(authMiddleware);

collectionRouter.post("/new", async (req, res, next) => {
  try {
    await collectionService.createCollection(req.body, res.locals.userId);
    res.status(200).json({ message: "Collection created" });
  } catch (error) {
    next(error);
  }
});

collectionRouter.post("/rename", async (req, res, next) => {
  try {
    await collectionService.renameCollection(req.body, res.locals.userId);
    res.status(200).json({ message: "Collection renamed" });
  } catch (error) {
    next(error);
  }
});

collectionRouter.delete("/", async (req, res, next) => {
  try {
    await collectionService.deleteCollection(req.query, res.locals.userId);
    res.status(200).json({ message: "Collection deleted" });
  } catch (error) {
    next(error);
  }
});
collectionRouter.get("/", async (req, res, next) => {
  try {
    const tables = await collectionService.getCollections(res.locals.userId);
    res.status(200).json(tables);
  } catch (error) {
    next(error);
  }
});

export { collectionRouter };
