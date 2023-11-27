import express from "express";
import { userService } from "../../domain/user/userService";

const userRouter = express.Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    await userService.createUser(req.body);
    res.status(200).json({ message: "user registered" });
  } catch (error) {
    next(error);
  }
});
