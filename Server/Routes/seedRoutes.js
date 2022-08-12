import express from 'express';
//import ProductScreen from '../../frontend/src/screens/ProductScreen';
import data from '../data/data.js';
import Product from '../models/productmodel.js';
import User from '../models/usermodel.js';
 const seedRouter = express.Router();

 seedRouter.get('/',async(req,res)=>{
     await Product.remove({});
     const createdProducts = await Product.insertMany(data.products)
    
    await User.remove({});
     const createdUsers = await User.insertMany(data.users)
    res.send({createdProducts,createdUsers})
    })

    export default seedRouter