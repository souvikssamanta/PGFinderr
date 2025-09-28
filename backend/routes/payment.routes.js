import express from "express";
import { newpayment, verification } from "../controller/payment.controller.js";
const paymentRouter = express.Router();
paymentRouter.post("/payment", newpayment);
paymentRouter.post("/verification", verification);
export default paymentRouter;