

import React, { use, useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { MyListDataContext } from "../context/MyListContext";
import { Home, Plus, Eye, Edit, Trash2, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "@/context/ListingContext";
import EditCard from "./EditCard";
import toast from "react-hot-toast";
import axios from "axios";
import { authDataContext } from "@/context/AuthContext";
const MyListing = () => {
  const { myListData } = useContext(MyListDataContext);
  const { userData } = useContext(userDataContext);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [popup, setPopup] = React.useState(false);
  const {serverUrl} = useContext(authDataContext);
const {cardDetails,setCardDetails}=useContext(listingDataContext);

const deleteListing = async (id) => {
  setLoading(true);
  try {
    const result = await axios.delete(serverUrl+`/api/listing/deleteListings/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    if (result.status===200) {
      toast.success("Listing Deleted Successfully");
      navigate("/mylistings");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete listing");
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              My Listings
            </h1>
            <p className="text-gray-600">
              Manage your PG and apartment listings
            </p>
          </div>

          <Button
            onClick={() => navigate("/listingpage1")}
            className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {myListData?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {myListData?.filter((item) => item.status === "active")
                      .length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {myListData?.length
                      ? (
                          myListData.reduce(
                            (sum, item) => sum + (item.ratings || 0),
                            0
                          ) / myListData.length
                        ).toFixed(1)
                      : "0.0"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600 fill-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Grid */}
        {myListData?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListData.map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      item.image1 ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {item.category || "PG"}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center">
                    <Star
                      size={14}
                      className="text-yellow-500 fill-yellow-500 mr-1"
                    />
                    <span className="text-sm font-semibold">
                      {item.ratings || "4.5"}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Title and Location */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin size={14} className="mr-1" />
                    <span className="line-clamp-1">{item.landmark}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {item.description ||
                      "Comfortable accommodation with all necessary amenities."}
                  </p>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">
                        Monthly Rent
                      </span>
                      <p className="text-xl font-bold text-green-700">
                        ₹{item.rent?.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/view/${item._id}`)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                              {setCardDetails(item) ,
                              navigate(`/edit-listing/${item._id}`)}
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        onClick={() => deleteListing(item._id)}
                        variant="outline"
                        className="text-red-600 border-red-200 h-8 w-8 hover:bg-red-50 flex items-center gap-2"
                        disabled={loading}
                      >
                        <Trash2 size={14} />
                        {/* {loading ? "Deleting..." : "Delete"} */}
                      </Button>
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
                <Home className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No listings yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't created any listings yet. Start by adding your first
                property.
              </p>
              <Button
                onClick={() => navigate("/listing")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Listing
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
    </div>
  );
};

export default MyListing;