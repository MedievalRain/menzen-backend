import cookieParser from "cookie-parser";
import express from "express";
import { corsOptions } from "../config/cors";
import cors from "cors";
import { errorMiddleware } from "../middleware/error";

const apiRouter = express.Router();
apiRouter.use(cookieParser());
apiRouter.use(cors(corsOptions));
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use(errorMiddleware);

export { apiRouter };
