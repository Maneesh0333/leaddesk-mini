import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

export default app;