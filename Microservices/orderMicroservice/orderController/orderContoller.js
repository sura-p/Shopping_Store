import express from "express";
import Order from "../model/ordermodel.js";


export const createOrder = expressAsyncHandler(async (req, res) => {
  const order = new Order({
    orderItems: req.body.orderitems.map((x) => ({ ...x, product: x._id })),
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingprice,
    taxPrice: req.body.taxprice,
    totalPrice: req.body.totalprice,
    PaymentMethod: req.body.paymentMethod,
    shippingAddress: req.body.shippingAddress,

    user: req.user._id,
  });

  const neworder = await order.save();
  res.status(201).send({ message: "New Order Created", neworder });
});

export const userOrders = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const order = await Order.find({ user: req.user._id });

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "order not found" });
  }
});

export const orderDetail = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "order not found" });
  }
});

  export const payOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.PaymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateorder = await order.save();
      res.send({ message: "order is paid", order: updateorder });
    } else {
      res.status(404).send({ message: "order not found" });
    }
  })

