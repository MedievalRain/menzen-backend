import express from "express";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    res.status(200).json({ message: "user registered" });
  } catch (error) {
    next(error);
  }
});
