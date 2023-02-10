import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";



dotenv.config();
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
app.use("/api/orders", (req,res) => {
    res.json({message:"working"})
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(
  process.env.ORDER_PORT,
  console.log("server running on " + process.env.ORDER_PORT)
);