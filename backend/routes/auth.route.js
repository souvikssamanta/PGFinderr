import express from "express"
import { login, logout, signup } from "../controller/auth.controller.js"
const authRouter=express.Router()
authRouter.post('/signup',signup)
authRouter.post("/login",login);
authRouter.post('/logout',logout)
export default authRouter




