

import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import
{
  Calendar,
  Home,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { bookingDataContext } from "@/context/BookingContext";

const MyBooking = () => {
  const { userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const bookingData = userData?.booking || [];
  const { cancelBooking } = useContext(bookingDataContext);
  // Sample booking status data
  const bookingStats = {
    total: bookingData.length,
    confirmed: bookingData.filter((item) => item.status === "confirmed").length,
    completed: bookingData.filter((item) => item.status === "completed").length,
    cancelled: bookingData.filter((item) => item.status === "cancelled").length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600">
              Manage your PG and apartment bookings
            </p>
          </div>

         
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {bookingStats.total}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {bookingStats.confirmed}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

         

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {bookingStats.cancelled}
                  </p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        {bookingData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {bookingData.map((booking) => (
              <Card
                key={booking._id}
                className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Property Image */}
                    <div className="md:w-48 h-36 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={
                          booking.image ||
                          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                        }
                        alt={booking.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {booking.title || "Property Name"}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin size={14} className="mr-1" />
                            <span>
                              {booking.landmark}, {booking.city}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      {/* Booking Dates */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Check-in</p>
                          <p className="font-medium">
                            {new Date(booking.checkIn).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Check-out</p>
                          <p className="font-medium">
                            {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                        </div>

                        <div className=" bg-white/90 rounded-full px-2  flex-col items-center">
                          <p className="text-sm text-gray-600">
                            Ratings
                          </p>
                          <div className="flex items-center mt-1">
                            <Star
                              size={14}
                              className="text-yellow-500 fill-yellow-500 mr-1"
                            />
                            <span className="text-sm font-semibold">
                              {booking.ratings || "4.5"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-xl font-bold text-green-700">
                            ₹{booking.totalRent?.toLocaleString() || "0"}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/view/${booking.l._id}`)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Property
                          </Button>

                          {booking.status === "confirmed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>cancelBooking(booking._id)}

                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't made any bookings yet. Start by exploring available
                properties.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-green-600 hover:bg-green-700"
              >
                Browse Properties
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
