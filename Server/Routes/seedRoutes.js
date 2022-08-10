import express from 'express';
//import ProductScreen from '../../frontend/src/screens/ProductScreen';
import data from '../data/data.js';
import Product from '../models/productmodel.js';
 const seedRouter = express.Router();

 seedRouter.get('/',async(req,res)=>{
     await Product.remove({});
     const createdProducts = await Product.insertMany(data.products)
    res.send({createdProducts})
    })

    export default seedRouter