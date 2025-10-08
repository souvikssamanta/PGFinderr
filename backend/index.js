
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import connectDb from './config/db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import bookingRouter from './routes/booking.route.js';
import paymentRouter from './routes/payment.routes.js';

let app = express();
let PORT= process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    // origin:"https://pgfinderr.onrender.com",
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
// app.use((req, res, next) => {
//   console.log("Cookies received:", req.cookies);
//   next();
// });

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use("/api/listing",listingRouter)
app.use('/api/booking',bookingRouter)
app.use('/api/pay',paymentRouter)
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running on port ${PORT}`);
})
