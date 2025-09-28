import express from "express"
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { addListing, deleteListing, findListings, getAllListings, myListings, updateListing } from "../controller/listing.controller.js";

const listingRouter=express.Router();
listingRouter.post(
  "/add",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),addListing
); 
listingRouter.get("/getListings",isAuth,getAllListings);
listingRouter.get("/myListings", isAuth, myListings);
listingRouter.get("/findListings/:id", isAuth,findListings);
listingRouter.post("/updateListings/:id",upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]), updateListing);

listingRouter.delete("/deleteListings/:id",deleteListing);
export default listingRouter;

