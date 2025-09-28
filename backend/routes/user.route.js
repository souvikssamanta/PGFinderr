import express from "express";

import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controller/user.controller.js";
const userRouter=express.Router();
userRouter.get('/currentUser',isAuth,getCurrentUser);

export default userRouter;