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

orderRoutes.get('/mine',isAuth,expressAsyncHandler(async(req,res)=>{
   console.log(req.user);
    const order = await Order.find({user:req.user._id});
    
   
    if(order){
        res.send(order)
    }
    else {
        res.status(404).send({message :'order not found'})
    }
}))



orderRoutes.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    console.log(order);
   
    if(order){
        res.send(order)
    }
    else {
        res.status(404).send({message :'order not found'})
    }
}))

orderRoutes.put('/:id/pay',isAuth,expressAsyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now()
        order.PaymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address : req.body.email_address,
        
        }
        const updateorder = await order.save();
        res.send({message:'order is paid',order:updateorder})
    }else {
        res.status(404).send({message :'order not found'})
    }
}))
export default orderRoutes;