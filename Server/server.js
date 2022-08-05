import express from 'express'
import data from './data/data.js';


const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("API is running");
});
app.get('/api/products',(req,res)=>{
    res.send(data.products)
})

app.listen(5000,console.log("server running ..."));