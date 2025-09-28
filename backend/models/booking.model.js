import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    image: {
        type: String,
    },
        title: {
        type: String,
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    totalRent: {
        type: Number,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
    },
    status: {
        type: String,
        enum: ["pending","confirmed","cancelled"],
        default: "pending",
    },
   
}, {timestamps: true});


const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
 

    

