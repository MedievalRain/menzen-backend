import express from "express";
import { apiRouter } from "./api/api";
import { PORT } from "./config/env";

const app = express();
app.use("/api", apiRouter);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${PORT}`);
});
