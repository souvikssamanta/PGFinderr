import axios from 'axios'
import React, { Children, createContext, useContext, useEffect } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { listingDataContext } from './ListingContext'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export const bookingDataContext=createContext()
const BookingContext = ({children}) => {
const[checkIn,setCheckIn]=React.useState("")
const[checkOut,setCheckOut]=React.useState("")
const[total,setTotal]=React.useState(0)
const[nights,setNights]=React.useState(0)
const {serverUrl}=useContext(authDataContext)
const{getCurrentUser}=useContext(userDataContext)
const{getListings}=useContext(listingDataContext)
const[bookingData,setBookingData]=React.useState(null)
const navigate=useNavigate()
const handleBooking=async(id)=>{
try {
  const result=await axios.post(serverUrl+`/api/booking/create/${id}`,
    {
    checkIn,
    checkOut,
    totalRent:total,
   
  },

  {
    headers:
    {Authorization:`Bearer ${localStorage.getItem("token")}`}
  }

)
await getCurrentUser()
await getListings()
if(result.status==201){
  
  setBookingData(result.data)
  toast.success("Booking successful!Pay now to Confirm! ")
  navigate("/payment")
  setCheckIn("")
  setCheckOut("")
 
 
}

} catch (error) {
  console.log(error)
  toast.error("Booking failed")
  navigate("/home")                                                             
}

}
const cancelBooking=async(id)=>{
  try {
    const result=await axios.post(serverUrl+`/api/booking/cancel/${id}`,{
      headers:
      {Authorization:`Bearer ${localStorage.getItem("token")}`}
    })
    await getCurrentUser()
    await getListings()
    if(result.status==200){
      toast.success("Booking cancelled")
      navigate("/mybookings")
    }
  } catch (error) {
    console.log(error)
    toast.error("Booking cancellation failed")
  }
    }












const value={
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    nights,
    setNights,
    handleBooking,
    cancelBooking,
    bookingData,
    setBookingData

}

  return (
    <div>
      <bookingDataContext.Provider  value={value} >
        {children}
      </bookingDataContext.Provider>
    </div>
  )
}

export default BookingContext





