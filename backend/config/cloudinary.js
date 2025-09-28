import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// export const uploadOnCloudinary = async (filepath) => {
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
//       api_key: process.env.CLOUDINARY_API_KEY ,
//       api_secret: process.env.CLOUDINARY_API_SECRET ,
//     });
//     try {
//        if(!filepath){
//         throw new Error("File path is required");
//        }
//        const uploadResult=await cloudinary.uploader.upload(filepath)
//        fs.unlinkSync(filepath)
//        return{
//         url:uploadResult.secure_url,
//        } 
//     } catch (error) {
//         fs.unlinkSync(filepath)
//         console.log(error)
//     }
// }


export const uploadOnCloudinary = async (filepath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filepath) throw new Error("File path is required");

    const uploadResult = await cloudinary.uploader.upload(filepath);

    // remove local file
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    return uploadResult.secure_url; // ✅ return string
  } catch (error) {
    if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath);
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};




