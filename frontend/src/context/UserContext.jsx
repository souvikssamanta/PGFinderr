import React, { createContext, useContext,useEffect } from 'react'
import { authDataContext } from './AuthContext';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from 'react';

export const userDataContext = createContext();

const UserContext = ({children}) => {
const{serverUrl}=useContext(authDataContext)
const [userData,setUserData]=useState(null);

const getCurrentUser=async()=>{
  try {
    const res = await axios.get(
     serverUrl+"/api/user/currentUser",
       
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    
   if(res.status===200){
      setUserData(res.data);
   }
  

  }  catch (error) {
    setUserData(null)
    console.log("Could not fetch user")
  }

}

useEffect(()=>{

    getCurrentUser();
},[])

const value={userData,setUserData,getCurrentUser}


  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>

    </div>
  )
}

export default UserContext
