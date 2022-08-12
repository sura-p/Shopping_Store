import express from 'express'
import Product from '../models/productmodel.js';
const productRouter = express.Router();

productRouter.get('/',async (req,res)=>{
    const products = await Product.find()
    res.send(products)
})

productRouter.get('/:slug',async(req,res)=>{
    console.log(data.products);
    const  product = await Product.findOne( {slud:req.params.slug})
    if(product){
        console.log(product);
        res.status(200).send(product)

    }
    else{
        res.status(404).send({message: 'Product Not Found'})
    }
    
})

export default productRouter