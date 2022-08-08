import express from 'express'
import data from './data/data.js';


const app = express();
// app.use(()=>{

// })
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API is running");
});
app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.get('/api/products/slug/:slug',(req,res)=>{
    const  product = data.products.find(x=>x.slug === req.params.slug)
    if(product){
        res.send(product)

    }
    else{
        res.status(404).send({message: 'Product Not Found'})
    }
    res.send(data.products)
})
app.listen(5001,console.log("server running ..."));