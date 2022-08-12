import express from 'express'
import data from './data/data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './Routes/seedRoutes.js';
import productRouter from './Routes/productRoutes.js';
import userRoutes from './Routes/userRouter.js';



dotenv.config()
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("connected to db");  
}).catch(err=>{
    console.log(err.message);
});


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/seed',seedRouter)

app.get("/",(req,res)=>{
    res.send("API is running");
});
app.use('/api/products',productRouter)
app.use('/api/users',userRoutes)

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})
app.listen(5001,console.log("server running ..."));