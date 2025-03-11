import express from "express";
import products from "./data/products.js";
import connectDb from "./config/db.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

connectDb(); //connect to mongodb
let PORT = process.env.PORT || 5000;

const server = express();
server.use(cors());

server.get("/", (req, res) => {
  res.send("getting connected to....");
});
server.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});
server.get("/api/products", (req, res) => {
  res.json(products);
});
server.listen(PORT, () => {
  console.log(`connected to server http://localHost:${PORT}`);
});
