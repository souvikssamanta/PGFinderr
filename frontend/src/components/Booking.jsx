
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
  Home,
  Building,
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

  const isHotel = cardDetails?.category === "Hotel";

  useEffect(() => {
    setIsVisible(true);
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    if (isHotel) {
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
    } else {
      // For non-hotel categories (PG/Flat), set fixed amount
      setTotal(100);
    }
  }, [checkIn, checkOut, cardDetails?.rent, isHotel]);

  const bookingHandler = (id) => {
    setLoading(true);
    handleBooking(id);
  };

  // Render non-hotel booking section (PG/Flat)
  const renderNonHotelBooking = () => (
    <div className="max-w-2xl h-screen w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500">
      <div className="px-6 py-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-gray-800">Reserve Property</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBook(false)}
            className="rounded-full hover:bg-gray-200"
          >
            ×
          </Button>
        </div>

        {/* Property Details */}
        <div className="space-y-1">
          {/* <div className="h-40 rounded-lg overflow-hidden ">
            <img
              src={
                cardDetails?.image1 ||
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
              }
              alt={cardDetails?.title}
              className="w-full h-full object-cover"
            />
          </div> */}

          <div className="flex items-center ">
            <Home className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              {cardDetails?.title}
            </h3>
          </div>

          <div className="flex items-center text-gray-600 ">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {cardDetails?.landmark}, {cardDetails?.city}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500 ">
            <Building className="h-4 w-4 mr-1" />
            <span>{cardDetails?.category}</span>
          </div>
        </div>

        {/* Reservation Info */}
        <Card className="border-0 bg-blue-50 mt-2 mb-2">
          <CardContent className="px-4">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-gray-800">
                Reservation Process
              </h4>
            </div>
           
            <h2 className="text-red-500">**Checkin must be after one or two days**</h2>
            <div className="space-y-2 mb-4 mt-5">
              <Label className="text-gray-700 font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-green-600" />
                Check-in Date
              </Label>
              <Input
                type="date"
                min={minDate}
                value={checkIn}
                onChange={(e) => {setCheckIn(e.target.value);
                  setCheckOut(e.target.value);
                }}
                className="border-gray-300 focus:border-green-500"
                required
              />
            </div>

            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Pay ₹100 to reserve this property</li>
              <li>• Connect directly with the property owner</li>
              <li>• Discuss final terms and pricing</li>
              <li>• Complete booking offline</li>
              <li>• Reservation fee will be adjusted in final amount</li>
            </ul>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="border-0 bg-gray-50">
          <CardContent className="px-4">
            <h4 className="font-semibold text-gray-800  border-b py-2">
              Reservation Summary
            </h4>

            <div className="space-y-2 text-sm mb-2">
              <div className="flex justify-between">
                <span>Reservation Fee</span>
                <span>₹100.00</span>
              </div>

              <div className="flex justify-between text-green-700 font-semibold border-t pt-2 mt-2">
                <span>Total Amount</span>
                <span>₹100.00</span>
              </div>
            </div>

            <Button
              disabled={!checkIn}
              onClick={() => bookingHandler(cardDetails._id)}
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Reservation Fee
                </>
              )}
            </Button>

            {/* Security Badge */}
            <div className="flex items-center justify-center mt-2 space-x-1 text-xs text-gray-500">
              <Shield className="h-3 w-3" />
              <span>Secure payment · Refundable</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render hotel booking section (existing code)
  const renderHotelBooking = () => (
    <div
      className={`max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Booking Form */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-50 to-blue-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Book Your Stay</h2>
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
                onChange={(e) => {setCheckIn(e.target.value);
                   setCheckOut(e.target.value)}}
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
                  <span>Monthly Rent × {nights} nights</span>
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
                onClick={() => bookingHandler(cardDetails._id)}
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
  );

  return (
    <div className="w-full h-full rounded-xl backdrop-blur-sm z-50 flex items-center justify-center">
      {isHotel ? renderHotelBooking() : renderNonHotelBooking()}
    </div>
  );
};

export default Booking;























