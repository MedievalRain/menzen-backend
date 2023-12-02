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

coinRouter.get("/collection", async (req, res, next) => {
  try {
    const coins = await coinService.getCoins(req.query, res.locals.userId);
    res.status(200).json(coins);
  } catch (error) {
    next(error);
  }
});
coinRouter.get("/", async (req, res, next) => {
  try {
    const coin = await coinService.getCoin(req.query, res.locals.userId);
    res.status(200).json(coin);
  } catch (error) {
    next(error);
  }
});

coinRouter.post("/", async (req, res, next) => {
  try {
    await coinService.editCoinValues(req.body, res.locals.userId);
    res.status(200).json({ message: "Coin values edited" });
  } catch (error) {
    next(error);
  }
});

coinRouter.delete("/", async (req, res, next) => {
  try {
    await coinService.deleteCoin(req.query, res.locals.userId);
    res.status(200).json({ message: "Coin deleted" });
  } catch (error) {
    next(error);
  }
});
export { coinRouter };
