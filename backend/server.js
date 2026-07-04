import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import clusterRoutes from "./routes/clusterRoutes.js";
import ingestRoutes from "./routes/ingestRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("🚀 News Pulse API Running...");
});

app.use("/clusters", clusterRoutes);
app.use("/ingest", ingestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});