import { uploadOnCloudinary } from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const addListing = async (req, res) => {
  try {
    
    const host = req.userId;
    if(!host){
        return res.status(401).json({message:"Host not found"})
    }
    const { title, description, rent, city, landmark, category } = req.body;
    if (!title || !description || !rent || !city || !landmark || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const image1 = await uploadOnCloudinary(req.files.image1?.[0]?.path);
    const image2 = await uploadOnCloudinary(req.files.image2?.[0]?.path);
    const image3 = await uploadOnCloudinary(req.files.image3?.[0]?.path);

    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      host,
      image1, 
      image2,
      image3
    });
    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    return res
      .status(201)
      .json({ message: "Listing created successfully", listing });
      
  } catch (error) {
    return res
      .status(500)
      .json({ message: `AddListing error :${error.message}` });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    return res.status(201).json(listings);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `GetAllListings error :${error.message}` });
  }
};

export const myListings = async (req, res) => {
  try {
    const user = await User.findById(req.userId).sort({ createdAt: -1 }).populate("listing");
    
    return res.status(200).json(user.listing);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `GetMyListings error :${error.message}` });
  }
};

export const findListings=async(req,res)=>{
  try {
    const id=req.params.id;
    const listing=await Listing.findById(id);
    return res.status(200).json(listing)
  } catch (error) {
    return res.status(500).json({message:`FindListing error:${error.message}`})
  }
}

export const updateListing=async(req,res)=>{
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ message: "Host not found" });
    }
     const list = await Listing.findById(id);
     if (!list) {
      return res.status(404).json({ message: "Listing not found" });
    }


    const { title, description, rent, city, landmark } = req.body;
    if (!title || !description || !rent || !city || !landmark ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const image1 = req.files?.image1
      ? await uploadOnCloudinary(req.files.image1[0].path)
      : list.image1; // keep old

    const image2 = req.files?.image2
      ? await uploadOnCloudinary(req.files.image2[0].path)
      : list.image2;

    const image3 = req.files?.image3
      ? await uploadOnCloudinary(req.files.image3[0].path)
      : list.image3;


    const listing = await Listing.findByIdAndUpdate(id,{
      title,
      description,
      rent,
      city,
      landmark,
      
      image1,
      image2,
      image3,
    },);
    
    return res
      .status(200)
      .json({ message: "Listing created successfully", listing });
      
  } 
  catch (error) {
    return res.status(500).json({message:`UpdateListing error:${error.message}`})
  }
}

export const deleteListing=async(req,res)=>{
  try {
    const id=req.params.id;
   
    const listing=await Listing.findByIdAndDelete(id);
    console.log("Listing to be deleted:", listing);

    if(!listing){
      return res.status(404).json({message:"Listing not found"})
    }
    console.log("Deleted listing:", listing);

    const user = await User.findByIdAndUpdate(
      listing.host,
      { $pull: { listing: listing._id } },
      { new: true }
    );
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json(listing)
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:`DeleteListing error:${error.message}`})
  }
}

 






