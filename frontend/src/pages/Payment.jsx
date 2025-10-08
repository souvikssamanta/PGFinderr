

import { authDataContext } from "@/context/AuthContext";
import { bookingDataContext } from "@/context/BookingContext";
import React, { useContext, useState } from "react";
import axios from "axios";
import {
  CreditCard,
  Shield,
  CheckCircle,
  Lock,
  Calendar,
  Home,
  MapPin,
  Loader,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { total, bookingData } = useContext(bookingDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const id = bookingData?.booking._id;

  const initPay = (order) => {
    const options = {
  
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:"NestHub Payments",
      order_id: order.id,
      handler: async function (response) {
        console.log("Payment successful", response);
        const data = await axios.post(
          `${serverUrl}/api/pay/verification`,
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (data.status == 200) {
          navigate("/success", {
            state: {
              paymentId: response.razorpay_payment_id,
              amount: total,
              
            },
          });
        } else {
          navigate("/failure", {
            state: {
              paymentId: response.razorpay_payment_id,
            },
          });
        }
      },
      prefill: {
        email: "user@example.com",
      },
      theme: {
        color: "#16a34a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const responseRazorpay = await axios.post(
        serverUrl + "/api/pay/payment",
        {
          amount: Number(total) , // Razorpay expects amount in paise
          bookingId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (responseRazorpay.data.success) {
        initPay(responseRazorpay.data.order);
      } else {
        console.error("Payment initialization failed");
        alert("Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-600">Secure payment powered by Razorpay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              {/* Booking ID */}
              <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Booking ID</span>
                <span className="font-mono text-sm text-gray-800">{id}</span>
              </div>

              

              {/* Booking Dates */}
              {bookingData?.booking && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Booking Period
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar size={14} className="mr-1" />
                        Check-in
                      </div>
                      <div className="font-medium text-gray-800">
                        {new Date(
                          bookingData.booking.checkIn
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar size={14} className="mr-1" />
                        Check-out
                      </div>
                      <div className="font-medium text-gray-800">
                        {new Date(
                          bookingData.booking.checkOut
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Details
              </h2>

              {/* Security Badge */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <Lock className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-center text-sm text-green-700">
                  256-bit SSL secured payment · Your data is protected
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-3">
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-green-500 rounded-lg p-3 text-center cursor-pointer bg-green-50">
                    <CreditCard className="h-6 w-6 mx-auto text-green-600 mb-1" />
                    <span className="text-sm font-medium">Card</span>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-green-300">
                    <div className="h-6 w-6 mx-auto mb-1 bg-gray-200 rounded"></div>
                    <span className="text-sm text-gray-600">UPI</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Instant confirmation
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Free cancellation within 24 hours
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  24/7 customer support
                </div>
              </div>

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <BadgeCheck className="mr-2 h-5 w-5" />
                    Pay ₹{total?.toFixed(2)}
                  </>
                )}
              </Button>

              {/* Razorpay Logo */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500 mb-2">Secured by</p>
                <div className="bg-gray-100 rounded-lg p-2 inline-block">
                  <span className="text-xs font-semibold text-gray-700">
                    Razorpay
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;













