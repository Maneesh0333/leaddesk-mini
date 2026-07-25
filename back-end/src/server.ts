import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";
dotenv.config();


const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
  await connectDB();
  console.log(`Server running on ${PORT}`);
});