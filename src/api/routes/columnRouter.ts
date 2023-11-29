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

export { columnRouter };
