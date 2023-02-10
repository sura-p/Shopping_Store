import express from "express";
import Product from "../model/productmodel.js";
export const getProduct=   async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

export const productDetail=   async (req, res) => {
  console.log(data.products);
  const product = await Product.findOne({ slud: req.params.slug });
  if (product) {
    console.log(product);
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
};

export const removeProduct = async(req, res) => {
  try {
   const data =  await Product.remove({});
    res.status(200).json({data:data})
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "try again" });
  }
}

export const registerProduct = async (req, res) => {
  try {
    const createdProducts = await Product.insertMany(req.body.products);
    res.status(200).json({ data: createdProducts });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "try again" });
  }
};
