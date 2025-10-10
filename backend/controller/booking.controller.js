
import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
export const createBooking=async(req,res)=>{
try {
  const id=req.params.id;
  const{checkIn,checkOut,totalRent}=req.body;  
  const listing=await Listing.findById(id);
  if(!listing){
    return res.status(404).json({message:"Listing not found"})
  }
if(new Date(checkIn)>new Date(checkOut)){
  return res.status(400).json({message:"Check-out date must be after check-in date"})
}

const booking=await Booking.create({
  listing:id,
  host:listing.host,
  guest:req.userId,
  checkIn,
  checkOut,
  totalRent,
  image:listing.image1,
  title:listing.title,
  landmark:listing.landmark,
  category:listing.category,
  city:listing.city,
  isBooked:listing.isBooked,
  ratings:listing.ratings,
  
})

const user=await User.findByIdAndUpdate(req.userId,{$push:{booking:booking._id}},{new:true});
if(!user){
  return res.status(404).json({message:"User not found"})
}

listing.guest=req.userId;
listing.isBooked=true;
await listing.save();
res.status(201).json({message:"Booking created successfully",booking})
} catch (error) {
    return res.status(500).json({message:"Internal server error",error: error.message})
}

}

export const cancelBooking=async(req,res)=>{
  try {
    const id=req.params.id;
    
    const booking=await Booking.findByIdAndUpdate(id,{status:"cancelled",
     
    },{new:true});
    if(!booking){
      return res.status(404).json({message:"Booking not found"})
    }

    const user=await User.findByIdAndUpdate(req.userId,{$pull:{booking:booking._id}},{new:true});
    console.log(user)
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    const listing = await Listing.findByIdAndUpdate(
      booking.listing,
      {
        guest: null,
        isBooked: false,
      },
      { new: true }
    );
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }



    return res.status(200).json({message:"Booking cancelled successfully",booking})
  } catch (error) {
    return res.status(500).json({message:`Cancel booking error :${error.message}`})
  }
}







