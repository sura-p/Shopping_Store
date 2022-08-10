import express from 'express'
import data from './data/data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './Routes/seedRoutes.js';



dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("connected to db");  
}).catch(err=>{
    console.log(err.message);
});


const app = express();
app.use('/api/seed',seedRouter)
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API is running");
});
app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.get('/api/products/:slug',(req,res)=>{
    console.log(data.products);
    const  product = data.products.find((x)=>{
        
       return  x.id == req.params.slug})
    if(product){
        console.log(product);
        res.status(200).send(product)

    }
    else{
        res.status(404).send({message: 'Product Not Found'})
    }
    
})
app.listen(5001,console.log("server running ..."));