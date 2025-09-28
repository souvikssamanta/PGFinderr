import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [0, "Fare must be a positive number"],
  },
});

const paymentModel = mongoose.model("payment", paymentSchema);
export default paymentModel;
