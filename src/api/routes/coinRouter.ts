import express from "express";
import { coinService } from "../../domain/coin/CoinService";
import { authMiddleware } from "../../middleware/auth";

const coinRouter = express.Router();
coinRouter.use(authMiddleware);
coinRouter.post("/new", async (req, res, next) => {
  try {
    const id = await coinService.createCoin(req.body, res.locals.userId);
    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
});

coinRouter.get("/", async (req, res, next) => {
  try {
    const coins = await coinService.getCoins(req.query, res.locals.userId);
    res.status(200).json(coins);
  } catch (error) {
    next(error);
  }
});

export { coinRouter };
