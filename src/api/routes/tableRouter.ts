import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { tableService } from "../../domain/tables/tableService";

const tableRouter = express.Router();
tableRouter.use(authMiddleware);

tableRouter.post("/new", async (req, res, next) => {
  try {
    await tableService.createTable(req.body, res.locals.userId);
    res.status(200).json({ message: "Table created" });
  } catch (error) {
    next(error);
  }
});

export { tableRouter };
