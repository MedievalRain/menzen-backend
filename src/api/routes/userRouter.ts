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

userRouter.get("/verify", async (req, res, next) => {
  try {
    await userService.verifyEmail(req.params);
    res.status(200).json({ message: "user verified" });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const token = await userService.login(req.body);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // FIXME change in production
        sameSite: "lax",
        expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000), // 3 days
      })
      .json({ message: "succesful login" });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
