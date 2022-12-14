import express from 'express'
import path from 'path'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './Routes/seedRoutes.js';
import productRouter from './Routes/productRoutes.js';
import userRoutes from './Routes/userRouter.js';
import orderRoutes from './Routes/Orderroute.js';



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


app.use('/api/products',productRouter)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.get('/api/keys/paypal',(req,res)=>{
    res.send(process.env.CLIENT_ID || 'sb');
})
const __dirname = path.resolve();
console.log(__dirname);
app.use(express.static(path.join(__dirname, '/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/build/index.html'))
})
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})


app.listen(5000,console.log("server running ..."));