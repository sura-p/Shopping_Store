import express from "express";
import { getProduct, productDetail, registerProduct, removeProduct } from "../productController/productContoller.js";
export const productRouter = express.Router();
productRouter.get("/", getProduct);
productRouter.get("/:slug", productDetail);
productRouter.get("/remove", removeProduct)
productRouter.get("/insert", registerProduct);
