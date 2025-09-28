

import React, { useContext } from "react";
import { ArrowLeft, MapPin, Home, CheckCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ListingPage3() {
  const navigate = useNavigate();
  const {
    title,
    description,
    frontendImage1,
    frontendImage2,
    frontendImage3,
    rent,
    city,
    landmark,
    category,
    handleAddListing,
    adding,
  } = useContext(listingDataContext);

  // Sample amenities for PG/mess (you can make this dynamic)
  const amenities = [
    "WiFi Included",
    "Power Backup",
    "Security",
    "Housekeeping",
    "Laundry Service",
    "Common Area",
    "Food Available",
    "Parking",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/listingpage2")}
            className="rounded-full border-gray-300 hover:border-green-600 hover:text-green-600"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Preview Listing
            </h1>
            <p className="text-gray-600">
              Step 3: Review and publish your listing
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 bg-gray-50">
            {[frontendImage1, frontendImage2, frontendImage3].map(
              (image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg h-48"
                >
                  <img
                    src={
                      image ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                    }
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!image && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <Home className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <CardContent className="p-6">
            {/* Price Badge */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {title || "Property Title"}
                </h1>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">
                    {landmark && `${landmark}, `}
                    {city || "City"}
                  </span>
                </div>
              </div>

              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <div className="text-xl font-bold">₹{rent || "0"}</div>
                <div className="text-sm">per month</div>
              </div>
            </div>

            {/* Category Badge */}
            {category && (
              <div className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-6 font-medium">
                {category}
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {description || "No description provided."}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Included Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle
                      size={16}
                      className="text-green-500 mr-2 flex-shrink-0"
                    />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
              <Button
                onClick={() => navigate("/listingpage2")}
                variant="outline"
                className="flex-1"
              >
                Edit Details
              </Button>
              <Button
                onClick={handleAddListing}
                disabled={adding}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {adding ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Listing"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Step 3 of 3 - Ready to publish!
          </p>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Review your listing details carefully before publishing. You can
            edit this listing later from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}