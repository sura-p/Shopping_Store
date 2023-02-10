import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {productRouter } from "./productRoutes/productRoutes.js";



dotenv.config();
console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: '1gb', extended: true }));
app.use("/api/product", productRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(
  process.env.PRODUCT_PORT,
  console.log("server running on " + process.env.PRODUCT_PORT)
);