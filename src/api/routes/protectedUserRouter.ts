import express from "express";
import { authMiddleware } from "../../middleware/auth";

const protectedUserRouter = express.Router();
protectedUserRouter.use(authMiddleware);

protectedUserRouter.post("/logout", async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        secure: false, // FIXME change in production
        sameSite: "lax",
        expires: new Date(0),
      })
      .json({ message: "succesful logout" });
  } catch (error) {
    next(error);
  }
});

export { protectedUserRouter };
