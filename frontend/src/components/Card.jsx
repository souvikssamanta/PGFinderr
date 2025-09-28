


import React, { useContext } from "react";
import { MapPin, Star, Eye } from "lucide-react";
import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/ListingContext";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  image,
  title,
  description,
  rent,
  landmark,
  city,
  ratings,
  category,
  isbooked,
  amenities,
}) => {
  const { userData } = useContext(userDataContext);
  const { findListing } = useContext(listingDataContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (userData) {
      findListing(id);
      // navigate(`/listing/${id}`);
    } else {
      toast.error("You need to login first");
      navigate("/login");
    }
  };

  // Format amenities to show only first 2-3
  const displayAmenities = amenities?.slice(0, 3) || [];

  return (
    <div className="w-full sm:w-[300px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100">
      {/* Image with overlay effect */}
      <div className=" relative overflow-hidden">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
          }
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {isbooked ? "Booked" : "Available"}
          </span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-sm font-semibold">{ratings || "4.5"}</span>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and location */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300 line-clamp-1">
            {title}
          </h2>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{landmark}</span>
            {city && <span className="mx-1">•</span>}
            <span className="line-clamp-1">{city}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description ||
            "Comfortable accommodation with all necessary amenities for a pleasant stay."}
        </p>

        {/* Amenities chips */}
        {displayAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {displayAmenities.map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {amenities?.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price and action button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Starting from</span>
            <span className="text-xl font-bold text-green-700">
              ₹{rent || "8,000"}
              <span className="text-sm font-normal text-gray-600">/month</span>
            </span>
          </div>

          <Button
            onClick={handleClick}
            size="sm"
            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
          >
            <Eye size={16} />
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;





