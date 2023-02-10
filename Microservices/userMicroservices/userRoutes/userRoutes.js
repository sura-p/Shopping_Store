import express from "express";
import { dummyUsers, removeUser, SignIn, signUp, userProfile } from "../userController/userContoller.js";
import { isAuth } from "../utils.js";
export const userRoutes = express.Router();

userRoutes.post("/signin", SignIn);
userRoutes.post("/signup", signUp);
userRoutes.put("/profile",isAuth, userProfile);
userRoutes.delete("/removeusers", removeUser);
userRoutes.post("/insert", dummyUsers);
