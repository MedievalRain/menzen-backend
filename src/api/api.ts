import cookieParser from "cookie-parser";
import express from "express";
import { corsOptions } from "../config/cors";
import cors from "cors";
import { errorMiddleware } from "../middleware/error";
import { userRouter } from "./routes/userRouter";
import { collectionRouter } from "./routes/collectionRouter";
import { columnRouter } from "./routes/columnRouter";
import { coinRouter } from "./routes/coinRouter";

const apiRouter = express.Router();
apiRouter.use(cookieParser());
apiRouter.use(cors(corsOptions));
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use("/user", userRouter);
apiRouter.use("/collection", collectionRouter);
apiRouter.use("/column", columnRouter);
apiRouter.use("/coin", coinRouter);
apiRouter.use(errorMiddleware);

export { apiRouter };
