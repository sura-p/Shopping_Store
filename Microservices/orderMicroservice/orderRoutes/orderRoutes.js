import express from "express";
import {
  createOrder,
  orderDetail,
  payOrder,
  userOrders,
} from "../orderController/orderContoller.js";
import { isAuth } from "../utils.js";
const orderRoutes = express.Router();
orderRoutes.post("/", isAuth, createOrder);
orderRoutes.get("/mine", isAuth, userOrders);
orderRoutes.get("/:id", isAuth, orderDetail);
orderRoutes.put("/:id/pay", isAuth, payOrder);
