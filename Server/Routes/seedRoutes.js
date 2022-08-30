import axios from 'axios';
import express from 'express';
//import ProductScreen from '../../frontend/src/screens/ProductScreen';
import fs from 'fs'
import data from '../data/data.js';
import Product from '../models/productmodel.js';
import User from '../models/usermodel.js';
 const seedRouter = express.Router();

 seedRouter.get('/',async(req,res)=>{
     
     await Product.remove({});

     axios({
         method:'get',
         url:'https://fakestoreapi.com/products'
     }).then(async(Response)=>{
       // const createdProducts = await Product.insertMany(res.data)
      // fs.writeFileSync('data2.json',`${res.json()}`, function(err) {console.log(err);})
        console.log(Response.data);
        
     })
     const createdProducts = await Product.insertMany(data.products)
    
    await User.remove({});
     const createdUsers = await User.insertMany(data.users)
    res.send({createdProducts,createdUsers})
    })

    export default seedRouter