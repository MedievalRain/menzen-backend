import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { tableService } from "../../domain/tables/tableService";

const tableRouter = express.Router();
tableRouter.use(authMiddleware);

tableRouter.put("/new", async (req, res, next) => {
  try {
    await tableService.createTable(req.body, res.locals.userId);
    res.status(200).json({ message: "Table created" });
  } catch (error) {
    next(error);
  }
});

tableRouter.post("/rename", async (req, res, next) => {
  try {
    await tableService.renameTable(req.body, res.locals.userId);
    res.status(200).json({ message: "Table renamed" });
  } catch (error) {
    next(error);
  }
});

tableRouter.delete("/", async (req, res, next) => {
  try {
    await tableService.deleteTable(req.query, res.locals.userId);
    res.status(200).json({ message: "Table deleted" });
  } catch (error) {
    next(error);
  }
});
tableRouter.get("/", async (req, res, next) => {
  try {
    const tables = await tableService.getTables(res.locals.userId);
    res.status(200).json(tables);
  } catch (error) {
    next(error);
  }
});

export { tableRouter };
