// import React, { use, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { bookingDataContext } from "../context/BookingContext";
// const Booking = ({cardDetails}) => {
  
//     const[loading,setLoading]=useState(false)
//     const[min,setMin]=useState("")

// const {
//   checkIn,
//   setCheckIn,
//   checkOut,
//   setCheckOut,
//   total,
//   setTotal,
//   nights,
//   setNights,
// } = useContext(bookingDataContext);


// useEffect(() => {
//   if (checkIn && checkOut) {
//     const start = new Date(checkIn);
//     const end = new Date(checkOut);
//     const diffTime = Math.abs(end - start);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     setNights(diffDays);
//     const roomRate = cardDetails.rent;
//     const platformFee = 0.1 * roomRate;
//     const totalRent=platformFee+(diffDays*roomRate)
//     setTotal(totalRent);
//   }
// }, [checkIn, checkOut,cardDetails.rent]);



//   const handleBooking = () => {
   
//   };
// useEffect(()=>{
// let today = new Date().toISOString().split('T')[0];
// setMin(today)

// },[])

// useEffect(()=>{
//   if(checkIn && checkOut && new Date(checkIn)>=new Date(checkOut)){
//     toast.error("Check-out date must be after check-in date")
//     setCheckOut("")
//   }
// },[checkIn,checkOut])

//   return (
//     <div className="h-[100px] w-full rounded-2xl flex  flex-wrap px-4 justify-center  ">
//       <div className=" w-xl   px-4   h-[300px]">
//         {/* Heading */}
//         <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
//           Book Now
//         </h1>

//         {/* Check-in field */}
//         <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2">
//             Check-in Date
//           </label>
//           <input
//             type="date"
//             min={min}
//             value={checkIn}
//             required
//             onChange={(e) => setCheckIn(e.target.value)}
//             className="w-md p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />
//         </div>

//         {/* Check-out field */}
//         <div className="mb-6">
//           <label className="block text-gray-600 font-medium mb-2">
//             Check-out Date
//           </label>
//           <input
//             type="date"
//             min={min}
//             required
//             value={checkOut}
//             onChange={(e) => setCheckOut(e.target.value)}
//             className="w-md p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
//           />
//         </div>
//       </div>

//       <div className="max-w-xl w-md  flex flex-col justify-between">
//         {/* Left Section - Property details */}
//         <div className="md:col-span-2 bg-white rounded-t-2xl  shadow-lg overflow-hidden">
//           <img
//             src={cardDetails.image1}
//             alt="Hotel"
//             className="w-full h-50 object-cover"
//           />
//           <div className="p-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {cardDetails.title}
//             </h2>
//             <p className="text-gray-600 mt-2">{cardDetails.description}</p>
//             {/* Rating */}
//             <div className="flex items-center mt-4">star</div>
//           </div>
//         </div>

//         {/* Right Section - Price details */}
//         <div className="bg-white rounded-b-2xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             Price Details
//           </h3>

//           <div className="flex justify-between text-gray-700 mb-2">
//             <span>
//               ₹{cardDetails.rent} x {nights} nights
//             </span>
//             <span>₹{cardDetails.rent * nights}</span>
//           </div>

//           <div className="flex justify-between text-gray-700 mb-2">
//             <span>Platform Fee</span>
//             <span>₹{cardDetails.rent * 0.1}</span>
//           </div>

//           <hr className="my-3" />

//           <div className="flex justify-between text-lg font-bold text-gray-900">
//             <span>Total</span>
//             <span>₹{total}</span>
//           </div>
//           {/* Confirm button */}
//           <button
//             onClick={handleBooking}
//             className="w-sm mt-5 mx-auto bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;

// import React, { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { bookingDataContext } from "../context/BookingContext";
// import axios from "axios";
// import { authDataContext } from "../context/AuthContext";

// const Booking = ({ cardDetails }) => {
//   const [loading, setLoading] = useState(false);
//   const [min, setMin] = useState("");
//   const [isVisible, setIsVisible] = useState(false);
//   const{serverUrl}=useContext(authDataContext)
//   const {
//     checkIn,
//     setCheckIn,
//     checkOut,
//     setCheckOut,
//     total,
//     setTotal,
//     nights,
//     setNights,
//     bookingData, setBookingData,
//     handleBooking,
//   } = useContext(bookingDataContext);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   useEffect(() => {
//     if (checkIn && checkOut) {
//       const start = new Date(checkIn);
//       const end = new Date(checkOut);
//       const diffTime = Math.abs(end - start);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       setNights(diffDays);
//       const roomRate = cardDetails.rent;
//       const platformFee = 0.1 * roomRate;
//       const totalRent = platformFee + diffDays * roomRate;
//       setTotal(totalRent);
//     }
//   }, [checkIn, checkOut, cardDetails.rent]);

  

//   useEffect(() => {
//     let today = new Date().toISOString().split("T")[0];
//     setMin(today);
//   }, []);

//   useEffect(() => {
//     if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
//       toast.error("Check-out date must be after check-in date");
//       setCheckOut("");
//     }
//   }, [checkIn, checkOut]);

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 transition-all duration-500 ${
//         isVisible ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
//         <div className="md:flex">
//           {/* Left Section - Property details */}
//           <div className="md:w-1/2 bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
//             <div className="h-full flex flex-col justify-between">
//               <form onSubmit={(e) => e.preventDefault()}>
//                 <h1 className="text-3xl font-bold text-indigo-800 mb-2 text-center animate-fade-in">
//                   Book Your Stay
//                 </h1>
//                 <p className="text-gray-600 text-center mb-6">
//                   Complete your reservation in just a few steps
//                 </p>

//                 {/* Check-in field */}
//                 <div className="mb-5">
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Check-in Date
//                   </label>
//                   <input
//                     type="date"
//                     min={min}
//                     value={checkIn}
//                     required
//                     onChange={(e) => setCheckIn(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
//                   />
//                 </div>

//                 {/* Check-out field */}
//                 <div className="mb-6">
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Check-out Date
//                   </label>
//                   <input
//                     type="date"
//                     min={min}
//                     required
//                     value={checkOut}
//                     onChange={(e) => setCheckOut(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
//                   />
//                 </div>
//               </form>

//               <div className="bg-white rounded-2xl p-4 shadow-md mt-4">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   Quick Info
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   Select your dates to see pricing details and complete your
//                   booking.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Property image and price details */}
//           <div className="md:w-1/2">
//             <div className="h-48 md:h-64 overflow-hidden">
//               <img
//                 src={cardDetails.image1}
//                 alt="Hotel"
//                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//               />
//             </div>

//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 {cardDetails.title}
//               </h2>
//               <p className="text-gray-600 mb-4 line-clamp-2">
//                 {cardDetails.description}
//               </p>

//               {/* Rating */}
//               <div className="flex items-center mb-6">
//                 <div className="flex text-yellow-400">{"★".repeat(5)}</div>
//                 <span className="ml-2 text-gray-600">5.0 (120 reviews)</span>
//               </div>

//               {/* Price details */}
//               <div className="bg-gray-50 rounded-2xl p-5">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
//                   Booking Summary
//                 </h3>

//                 <div className="space-y-3">
//                   <div className="flex justify-between text-gray-700">
//                     <span>
//                       ₹{cardDetails.rent} × {nights} nights
//                     </span>
//                     <span>₹{cardDetails.rent * nights}</span>
//                   </div>

//                   <div className="flex justify-between text-gray-700">
//                     <span>Platform Fee</span>
//                     <span>₹{(cardDetails.rent * 0.1).toFixed(2)}</span>
//                   </div>

//                   <div className="border-t border-gray-300 pt-3 mt-2">
//                     <div className="flex justify-between text-lg font-bold text-indigo-700">
//                       <span>Total Amount</span>
//                       <span>₹{total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleBooking(cardDetails._id) }
//                   disabled={!checkIn || !checkOut}
//                   className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
//                     !checkIn || !checkOut
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                   } text-white shadow-md hover:shadow-lg`}
//                 >
//                   {loading ? "Processing..." : "Confirm Booking"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Booking;




import React, { use, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { bookingDataContext } from "../context/BookingContext";
import { authDataContext } from "../context/AuthContext";
import {
  Calendar,
  CreditCard,
  Shield,
  CheckCircle,
  MapPin,
  Star,
  Loader,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
const Booking = ({ cardDetails, setBook }) => {
  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    nights,
    setNights,
    handleBooking,
  } = useContext(bookingDataContext);

  useEffect(() => {
    setIsVisible(true);
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      if (start >= end) {
        toast.error("Check-out date must be after check-in date");
        setCheckOut("");
        return;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);

      const roomRate = cardDetails?.rent || 0;
      const platformFee = roomRate * 0.1; // 10% platform fee
      const totalRent = platformFee + diffDays * roomRate;
      setTotal(totalRent);
    }
  }, [checkIn, checkOut, cardDetails?.rent]);


useEffect(() => {
  handleBooking(cardDetails._id);
}, []);








  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Booking Form */}
          <div className="md:w-1/2 bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Book Your Stay
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBook(false)}
                className="rounded-full hover:bg-gray-200"
              >
                ×
              </Button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Check-in Date */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-green-600" />
                  Check-in Date
                </Label>
                <Input
                  type="date"
                  min={minDate}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border-gray-300 focus:border-green-500"
                  required
                />
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-green-600" />
                  Check-out Date
                </Label>
                <Input
                  type="date"
                  min={checkIn || minDate}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="border-gray-300 focus:border-green-500"
                  required
                />
              </div>
            </form>

            {/* Security Features */}
            <Card className="mt-6 border-0 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure booking with instant confirmation</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Property Details & Summary */}
          <div className="md:w-1/2 p-6">
            {/* Property Image */}
            <div className="h-48 rounded-lg overflow-hidden mb-4">
              <img
                src={
                  cardDetails?.image1 ||
                  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                }
                alt={cardDetails?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {cardDetails?.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {cardDetails?.landmark}, {cardDetails?.city}
                </span>
              </div>
              <div className="flex items-center text-yellow-600">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="text-sm">4.8 (120 reviews)</span>
              </div>
            </div>

            {/* Booking Summary */}
            <Card className="border-0 bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">
                  Booking Summary
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Rent × {nights} months</span>
                    <span>₹{(cardDetails?.rent || 0) * nights}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Platform Fee (10%)</span>
                    <span>₹{((cardDetails?.rent || 0) * 0.1).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-green-700 font-semibold border-t pt-2 mt-2">
                    <span>Total Amount</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={()=>handleBooking(cardDetails._id)}
                  disabled={!checkIn || !checkOut || loading}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 h-12"
                >
                  {loading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Confirm Booking
                    </>
                  )}
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center mt-3 space-x-1 text-xs text-gray-500">
                  <Shield className="h-3 w-3" />
                  <span>Secure payment · Free cancellation</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;



























