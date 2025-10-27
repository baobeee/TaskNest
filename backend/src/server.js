import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRouters.js";
import { connectdDB } from "../config/db.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 8081;

connectdDB();

app.use("/api/tasks", taskRoute);

app.listen(8081, () => {
  console.log(`Server is running in port ${port}`);
});
