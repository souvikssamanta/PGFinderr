import getoken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs"
export const signup=async(req,res)=>{
try {
    
    let {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    let existUser=await User.findOne({email});
if(existUser){
    return res.status(400).json({message:"User already exists"})
}
let hashPassword=await bcrypt.hash(password,10);
let user=await User.create({name,email,password:hashPassword});

let token=getoken(user._id);
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:7*24*60*60*1000
    });
    return res.status(201).json(user)
} catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Signup error:${error.message}` });
}
}


export const login = async (req, res) => {
  try {
    let {email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    let isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Incorrect password"})
    }
    let token = getoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({user,token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Login error:${error.message}` });
  }
};

export const logout=async(req,res)=>{

    try {
        res.clearCookie("token")
        return res.status(201).json({message:"logout successfully"})
        
    } 
    catch (error) {
        return res.status(500).json({ message: `Logout error:${error.message}` });
    }
}










