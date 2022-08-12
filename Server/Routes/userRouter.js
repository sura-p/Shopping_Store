import express from 'express'
import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler'
const userRoutes = express.Router();

userRoutes.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    console.log(req.body.email);
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
             res.send({
                 _id: user._id,
                 name: user.name,
                 email: user.email,
                 isAdmin: user.isAdmin,
                 token:generateToken(user)
             });
             return       
        }
    }
    res.status(401).send({message:'invalid email or password'});
}))

userRoutes.post('/signup' ,async (req,res)=>{
        const newUser = await new User({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password)
        })
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user)
        });
})
export default userRoutes;