import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import { use } from 'react';
import { useEffect } from 'react';


export const listingDataContext=createContext()
const ListingContext = ({children}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frontendImage1, setFrontendImage1] = useState("");
  const [frontendImage2, setFrontendImage2] = useState("");
  const [frontendImage3, setFrontendImage3] = useState("");
  const [backendImage1, setBackendImage1] = useState("");
  const [backendImage2, setBackendImage2] = useState("");
  const [backendImage3, setBackendImage3] = useState("");
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [allListingData, setAllListingData] = useState([]); 
  const[searchData,setSearchData]=useState("")
  const[cardDetails,setCardDetails]=useState(null)
  const[categoryData,setCategoryData]=useState([])
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const { id } = useParams();  
  const handleAddListing = async () => {
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image1", backendImage1);
      formData.append("image2", backendImage2);
      formData.append("image3", backendImage3);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      const result = await axios.post(
        serverUrl + "/api/listing/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        { withCredentials: true }
      );
      if (result.status == 201) {
        setAdding(false);
        toast.success("Listing added successfully");
        navigate("/");
        setTitle("");
        setDescription("");
        setFrontendImage1("");
        setFrontendImage2("");
        setFrontendImage3("");
        setBackendImage1("");
        setBackendImage2("");
        setBackendImage3("");
        setRent("");
        setCity("");
        setLandmark("");
        setCategory("");
      }
    } catch (err) {
      toast.error("Fail to add listing");
      console.log(err);
    }
  };

const searchListing=async()=>{
  try {
    const result=await axios.get(serverUrl+`/api/listing/search?query=${data}`,{
      headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
    })
    if(result.status==200){
      setSearchData(result.data)
    }
  } catch (error) {
    console.log(error)

  }
}






  const getListings = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/listing/getListings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (result.status == 201) {
        setAllListingData(result.data);
        setListingData(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

const findListing=async(id)=>{

  try {
    const result = await axios.get(serverUrl+`/api/listing/findListings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
   if(result.status==200){
   
    setCardDetails(result.data)
    navigate(`/view/${id}`);
   }
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
   
  getListings();
}, []);
 

  
  let value = {
    title,
    setTitle,
    description,
    setDescription,
    frontendImage1,
    setFrontendImage1,
    frontendImage2,
    setFrontendImage2,
    frontendImage3,
    setFrontendImage3,
    backendImage1,
    setBackendImage1,
    backendImage2,
    setBackendImage2,
    backendImage3,
    setBackendImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category,
    setCategory,
    handleAddListing,
    listingData,
    setListingData,
    allListingData,
    adding,
    setAdding,
    findListing,
    cardDetails,
    setCardDetails,
    getListings,
    searchListing,
    searchData,
    setSearchData,
    categoryData,
    setCategoryData
  };

  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
}

export default ListingContext
