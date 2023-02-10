import express from "express";
import { addData } from "../seedController/seedContoller";
import { SignIn, signUp, userProfile } from "../seedController/userContoller";
export const seedRouter = express().router();

seedRouter.get("/",addData)