import cookieParser from "cookie-parser";
import express from "express";
import { corsOptions } from "../config/cors";
import cors from "cors";
import { errorMiddleware } from "../middleware/error";
import { userRouter } from "./routes/userRouter";
import { tableRouter } from "./routes/tableRouter";

const apiRouter = express.Router();
apiRouter.use(cookieParser());
apiRouter.use(cors(corsOptions));
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use("/user", userRouter);
apiRouter.use("/table", tableRouter);
apiRouter.use(errorMiddleware);

export { apiRouter };
