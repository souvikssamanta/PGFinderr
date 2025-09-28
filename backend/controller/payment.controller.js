import paymentModel from "../models/payment.model.js";
import razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/booking.model.js";
//intialize razorpay
console.log(process.env.RAZORPAY_KEY_ID,process.env.RAZORPAY_KEY_SECRET)
const razorpayInstance = new razorpay({
  key_id:"rzp_test_wivByQXLsLz38L",
  key_secret:"c6FPpqzzCLbMdEDtiatFdUeb",
});
let Id;
export const newpayment = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;
    Id=bookingId;
    const orderData = {
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new paymentModel(orderData);
    await newOrder.save();

    // const paymentMode = await rideModel.findByIdAndUpdate(rideId, {
    //   paymentType: "online",
    // });

    const options = {
      amount: Number(amount) * 100, // ensure integer paise
      currency: "INR",
      receipt: newOrder._id.toString(), // use receipt for Razorpay
    };
    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({ success: true, order }); // fixed typo and key
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};
export const verification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("expectedSignature", expectedSignature);
  console.log("razorpay_signature", razorpay_signature);
  const isAuthentic = razorpay_signature === expectedSignature;

  if (isAuthentic) {
   const booking= await Booking.findByIdAndUpdate(Id, {
      status: "confirmed",
    });
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
};
