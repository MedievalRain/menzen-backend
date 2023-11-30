import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { columnService } from "../../domain/column/ColumnService";

const columnRouter = express.Router();
columnRouter.use(authMiddleware);

columnRouter.post("/new", async (req, res, next) => {
  try {
    await columnService.createColumn(req.body, res.locals.userId);
    res.status(200).json({ message: "Column created" });
  } catch (error) {
    next(error);
  }
});

columnRouter.get("/", async (req, res, next) => {
  try {
    const columns = await columnService.getColumns(req.query, res.locals.userId);
    res.status(200).json(columns);
  } catch (error) {
    next(error);
  }
});
columnRouter.delete("/", async (req, res, next) => {
  try {
    await columnService.deleteColumn(req.query, res.locals.userId);
    res.status(200).json({ message: "Column deleted" });
  } catch (error) {
    next(error);
  }
});

columnRouter.post("/name", async (req, res, next) => {
  try {
    await columnService.renameColumn(req.body, res.locals.userId);
    res.status(200).json({ message: "Column renamed" });
  } catch (error) {
    next(error);
  }
});
columnRouter.post("/status", async (req, res, next) => {
  try {
    await columnService.changeColumnStatus(req.body, res.locals.userId);
    res.status(200).json({ message: "Column status changed" });
  } catch (error) {
    next(error);
  }
});

columnRouter.post("/order", async (req, res, next) => {
  try {
    await columnService.changeColumnOrder(req.body, res.locals.userId);
    res.status(200).json({ message: "Column order changed" });
  } catch (error) {
    next(error);
  }
});

export { columnRouter };
