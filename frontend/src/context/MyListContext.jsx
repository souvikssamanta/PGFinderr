import axios from 'axios';
import React, { use, useContext, useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
export const MyListDataContext = createContext();
const MyListContext = ({children}) => {

const{serverUrl}=useContext(authDataContext)
const[myListData,setMyListData]=useState(null)
const[cardDetails,setCardDetails]=useState(null)
const mylistdata=async()=>{

  const result=await axios.get(serverUrl+`/api/listing/myListings`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
   
  if(result.status==200){
    setMyListData(result.data)
  }


}


useEffect(()=>{
  mylistdata()
},[])




const value = {
  myListData,
  setMyListData,
  cardDetails,
  setCardDetails,
};

return (
    <MyListDataContext.Provider value={value}>
        {children}
    </MyListDataContext.Provider>
  )
}

export default MyListContext
