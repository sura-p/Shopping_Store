import express from 'express'
import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler'
import order from '../models/ordermodel.js';
import {isAuth} from '../utils.js'
import Order from '../models/ordermodel.js';
const orderRoutes = express.Router();
orderRoutes.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
    console.log(req.body);
    const order = new Order({
        orderItems:req.body.orderitems.map((x)=>({...x,product:x._id})),
        itemsPrice:req.body.itemsPrice,
        shippingPrice:req.body.shippingprice,
        taxPrice:req.body.taxprice,
        totalPrice:req.body.totalprice,
        PaymentMethod:req.body.paymentMethod,
        shippingAddress:req.body.shippingAddress,
        
        user:req.user._id,
      
    })

    const neworder = await order.save()
    res.status(201).send({message:'New Order Created',neworder})
}))

export default orderRoutes;