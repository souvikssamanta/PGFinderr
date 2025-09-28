import User from "../models/user.model.js";

export const getCurrentUser=async(req,res)=>{
    try {
        const user=await User.findById(req.userId).select("-password")
        .populate("booking","image title landmark city checkIn checkOut totalRent status").populate("listing","title image1 image2 image3 description category rent city landmark");
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
       
        return res.status(200).json(user)
        }
    catch (error) {
        return res.status(500).json({message:`Get current user error:${error.message}`})    
    }
}
