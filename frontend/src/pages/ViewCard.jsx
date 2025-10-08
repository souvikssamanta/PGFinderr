



import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { listingDataContext } from "../context/ListingContext";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import EditCard from "./EditCard";
import toast from "react-hot-toast";
import Booking from "../components/Booking";
import {
  MapPin,
  Star,
  Home,
  Bed,
  Bath,
  Users,
  Wifi,
  Utensils,
  Car,
  Shield,
  Calendar,
  Edit,
  Trash2,
  ArrowLeft,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ViewCard = () => {
  
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { cardDetails, setCardDetails } = useContext(listingDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const findListing = async (id2) => {
    try {
      const result = await axios.get(
        serverUrl + `/api/listing/findListings/${id2}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (result.status == 200) {
        setCardDetails(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(id);
    findListing(id);
  }, [id]);

  // Create an array of available images
  const images = [
    cardDetails?.image1,
    cardDetails?.image2,
    cardDetails?.image3,
  ].filter((img) => img); // Filter out any undefined/null images

  

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Sample amenities data (you can replace with actual data from cardDetails)
  const amenities = [
    { icon: <Wifi size={18} />, label: "WiFi", available: cardDetails?.wifi },
    {
      icon: <Utensils size={18} />,
      label: "Food",
      available: cardDetails?.food,
    },
    {
      icon: <Car size={18} />,
      label: "Parking",
      available: cardDetails?.parking,
    },
    { icon: <Shield size={18} />, label: "Security", available: true },
    { icon: <Users size={18} />, label: "Common Area", available: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-8 flex items-center justify-center">
      <div className={`max-w-6xl mx-auto px-4  ${book? "opacity-0 hidden" :"opacity-full block"} transition-all duration-500`}>
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-green-600 hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Listings
        </Button>

        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-80 w-full rounded-xl overflow-hidden">
                <img
                  src={
                    images[activeImage] ||
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
                  }
                  className="w-full h-full object-cover"
                  alt="Property view"
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {activeImage + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                        activeImage === index
                          ? "ring-2 ring-green-500 transform scale-105"
                          : "opacity-80 hover:opacity-100 hover:ring-1 hover:ring-gray-300"
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {cardDetails?.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={18} />
                  <span>
                    {cardDetails?.landmark}, {cardDetails?.city}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400 mr-1"
                    />
                    <span className="font-semibold">
                      {cardDetails?.ratings || "4.5"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {cardDetails?.bedrooms && (
                      <span className="flex items-center gap-1">
                        <Bed size={16} />
                        {cardDetails.bedrooms} Beds
                      </span>
                    )}
                    {cardDetails?.bathrooms && (
                      <span className="flex items-center gap-1">
                        <Bath size={16} />
                        {cardDetails.bathrooms} Baths
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-green-700">
                    ₹{cardDetails?.rent?.toLocaleString()}
                  </span>
                  <span className="text-gray-600 mb-1">/{cardDetails.category==="Hotel"?"Night":"Month"}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Inclusive of all maintenance charges
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {cardDetails?.description ||
                    "A comfortable and well-maintained accommodation with all necessary amenities for a pleasant stay."}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          amenity.available
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {amenity.icon}
                      </div>
                      <span
                        className={
                          amenity.available ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  //disabled={cardDetails.isBooked}
                  onClick={() => setBook(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg"
                >
                  <Calendar className="mr-2" size={20} />
                  Book Now
                </Button>

                
              </div>
            </div>
          </div>
        </Card>

        {/* Host Information */}
        {cardDetails?.hostInfo && (
          <Card className="mt-6 p-6 border-0 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Host Information</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">{cardDetails.hostInfo.name}</h4>
                <p className="text-gray-600 text-sm">Property Owner</p>
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Phone size={16} />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>


      {book && (
        <div className="absolute w-full  h-full backdrop-blur-sm z-50 flex justify-center items-center ">
          <Booking cardDetails={cardDetails} setBook={setBook} />
        </div>
      )}
    </div>
  );
};

export default ViewCard;