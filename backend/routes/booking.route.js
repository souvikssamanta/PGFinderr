import express from "express";
import { cancelBooking, createBooking } from "../controller/booking.controller.js";
import isAuth from "../middleware/isAuth.js";

const bookingRouter=express.Router();

bookingRouter.post("/create/:id",isAuth, createBooking)
bookingRouter.post("/cancel/:id", cancelBooking);
export default bookingRouter;