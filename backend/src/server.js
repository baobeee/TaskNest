import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRouters.js";
import { connectdDB } from "../config/db.js";
import cors from "cors";

const app = express();

dotenv.config();
const port = process.env.PORT || 8081;

//middlewares
app.use(express.json());

//Lỗi CORS: chia sẽ tài nguyên giữa các domain khác port
//cấp quyền cho domain
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", taskRoute);

//connect db trước mới chạy app
connectdDB().then(() => {
  app.listen(8081, () => {
    console.log(`Server is running in port ${port}`);
  });
});
