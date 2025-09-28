



import Card from "@/components/Card";
import { listingDataContext } from "@/context/ListingContext";
import React, { useContext, useState, useMemo } from "react";
import {
  Filter,
  Home,
  Users,
  Utensils,
  Building,
  Sparkles,
} from "lucide-react";

const ShowCase = () => {
  const { categoryData } = useContext(listingDataContext);
  const [propertyType, setPropertyType] = useState("All Types");
  const [maxRent, setMaxRent] = useState(50000);

  // Filter data
  const filteredData = useMemo(() => {
    return categoryData.filter((item) => {
      const typeMatch =
        propertyType === "All Types" ||
        (propertyType === "PG" && item.title?.toLowerCase().includes("pg")) ||
        (propertyType === "Flat" &&
          item.title?.toLowerCase().includes("flat")) ||
        (propertyType === "Mess" && item.title?.toLowerCase().includes("mess"));

      const rentMatch = item.rent <= maxRent;

      return typeMatch && rentMatch;
    });
  }, [categoryData, propertyType, maxRent]);

  const getPropertyIcon = (type) => {
    switch (type) {
      case "PG":
        return <Users className="w-4 h-4" />;
      case "Flat":
        return <Home className="w-4 h-4" />;
      case "Mess":
        return <Utensils className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Modern Header */}
      <div className="relative bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-gray-900 to-blue-600 bg-clip-text text-transparent mb-3">
              Discover Your Perfect Space
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore {filteredData.length} carefully curated properties
              tailored to your preferences
            </p>
          </div>
        </div>
      </div>

      {/* Modern Filter Section */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Property Type Filter */}
            <div className="flex-1 w-full">
              <label className=" text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {["All Types", "PG", "Flat", "Mess"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      propertyType === type
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {getPropertyIcon(type)}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Rent Filter */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Budget:{" "}
                <span className="text-blue-600 font-bold">
                  ₹{maxRent.toLocaleString()}
                </span>
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={maxRent}
                  onChange={(e) => setMaxRent(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹0</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏠</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any properties matching your current filters. Try
              adjusting your preferences to see more options.
            </p>
            <button
              onClick={() => {
                setPropertyType("All Types");
                setMaxRent(50000);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">
                  Showing {filteredData.length} properties
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-sm text-blue-600 font-semibold">
                  {propertyType}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                Up to ₹{maxRent.toLocaleString()}
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredData.map((item) => (
                <div
                  key={item._id}
                  className="transform hover:scale-[1.02] transition-transform duration-300"
                >
                  <Card
                    id={item._id}
                    image={item.image1}
                    title={item.title}
                    description={item.description}
                    rent={item.rent}
                    landmark={item.landmark}
                    city={item.city}
                    ratings={item.ratings}
                    isbooked={item.isBooked}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

     
    </div>
  );
};

export default ShowCase;

