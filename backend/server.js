import dotenv from "dotenv";
dotenv.config();
import express from "express";

import connectDb from "./config/db.js";
import cors from "cors";
import ProductRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDb(); //connect to mongodb
let PORT = process.env.PORT || 5000;

const server = express();
server.use(cors());

server.get("/", (req, res) => {
  res.send("getting connected to....");
});

server.use("/api/products", ProductRoutes);

server.use(notFound);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`connected to server http://localHost:${PORT}`);
});
