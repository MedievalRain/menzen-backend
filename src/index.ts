import express from "express";
import { apiRouter } from "./api/api";

const app = express();
app.use("/api", apiRouter);
app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${8000}`);
});
