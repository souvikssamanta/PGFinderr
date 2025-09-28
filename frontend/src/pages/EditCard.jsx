import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { listingDataContext } from "../context/ListingContext";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Home,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import { authDataContext } from "../context/AuthContext";


const EditCard = () => {

  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const {cardDetails}=useContext(listingDataContext)
  const [title, setTitle] = useState(cardDetails.title);
    const [description, setDescription] = useState(cardDetails.description);
    const [frontendImage1, setFrontendImage1] = useState("");
    const [frontendImage2, setFrontendImage2] = useState("");
    const [frontendImage3, setFrontendImage3] = useState("");
    const [backendImage1, setBackendImage1] = useState(cardDetails.image1);
    const [backendImage2, setBackendImage2] = useState(cardDetails.image2);
    const [backendImage3, setBackendImage3] = useState(cardDetails.image3);
    const [rent, setRent] = useState(cardDetails.rent);
    const [city, setCity] = useState(cardDetails.city);
    const [landmark, setLandmark] = useState(cardDetails.landmark);
    const[loading,setLoading]=useState(false)

const handleImage1 = (e) => {
  const file = e.target.files[0];
  setBackendImage1(file);
  setFrontendImage1(URL.createObjectURL(file));
};

const handleImage2 = (e) => {
  const file = e.target.files[0];
  setBackendImage2(file);
  setFrontendImage2(URL.createObjectURL(file));
};

const handleImage3 = (e) => {
  const file = e.target.files[0];
  setBackendImage3(file);
  setFrontendImage3(URL.createObjectURL(file));
};


  const handleSubmit =async (e) => {
    setLoading(true);
    e.preventDefault();
    
const formData = new FormData();
formData.append("title",title);
formData.append("description",description);
formData.append("image1",backendImage1);
formData.append("image2",backendImage2);
formData.append("image3",backendImage3);
formData.append("rent",rent);
formData.append("city",city);
formData.append("landmark",landmark);

for (let [key, value] of formData.entries()) {
  console.log(key, value);
}


  const result=await axios.post(serverUrl+`/api/listing/updateListings/${cardDetails._id}`,formData);
  if (result.status === 200) {
    setLoading(false);
  toast.success("Listing updated successfully!");
  navigate("/");
setTitle("");
setDescription("");
setFrontendImage1("");
setFrontendImage2("");
setFrontendImage3("");
setBackendImage1("");
setBackendImage2("");
setBackendImage3("");
setRent("");
setCity("");
setLandmark("");







  }
    
    
  
  };

  return (
    <div className="rounded-3xl max-w-2xl mx-auto bg-blue-500 flex items-center justify-center  ">
      <div className="w-full relative ">
        {/* Header with back button */}
        <div className="absolute  left-12 top-10 z-50 flex items-center mb-1">
          <button
            onClick={() => navigate("/mylistings")}
            className="flex cursor-pointer items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 group"
          >
            <ArrowLeft
              size={20}
              className="text-blue-600 group-hover:-translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 mx-auto backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-6 space-y-6 border border-white/20"
        >
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3">
              <Home size={30} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Update Property Details
            </h2>
            <p className="text-gray-500 mt-2">
              Let's start with the basic information about your property
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-2"></div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className=" font-medium text-gray-700 mb-1 flex items-center">
              <span className="w-2 h-5 bg-purple-500 rounded-full mr-2"></span>
              Property Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder="e.g., Beautiful Apartment with City View"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className=" font-medium text-gray-700 mb-1 flex items-center">
              <span className="w-2 h-5 bg-purple-500 rounded-full mr-2"></span>
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder="Describe your property's best features, amenities, and what makes it special..."
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Images (3 required)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* Image 1 */}
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage1}
                  className="hidden"
                />
                <div className="h-24 border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
                  {frontendImage1 ? (
                    <img
                      src={frontendImage1}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <img
                        src={cardDetails.image1}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </>
                  )}
                </div>
              </label>

              {/* Image 2 */}
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage2}
                  className="hidden"
                />
                <div className="h-24 border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
                  {frontendImage2 ? (
                    <img
                      src={frontendImage2}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <img
                        src={cardDetails.image2}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </>
                  )}
                </div>
              </label>

              {/* Image 3 */}
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage3}
                  className="hidden"
                />
                <div className="h-24 border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
                  {frontendImage3 ? (
                    <img
                      src={frontendImage3}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <img
                        src={cardDetails.image3}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* City */}
            <div className="space-y-2">
              <label className=" font-medium text-gray-700 mb-1 flex items-center">
                <span className="w-2 h-5 bg-purple-500 rounded-full mr-2"></span>
                City
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                  placeholder="Enter city"
                  required
                />
              </div>
            </div>

            {/* Rent */}
            <div className="space-y-2">
              <label className=" font-medium text-gray-700 mb-1 flex items-center">
                <span className="w-2 h-5 bg-purple-500 rounded-full mr-2"></span>
                Rent (₹)
              </label>
              <input
                type="number"
                name="rent"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                placeholder="Enter rent amount"
                required
              />
            </div>
          </div>

          {/* Landmark */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700 mb-1 flex items-center">
              <span className="w-2 h-5 bg-purple-500 rounded-full mr-2"></span>
              Landmark (Optional)
            </label>
            <input
              type="text"
              name="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              placeholder="Enter nearby landmark"
            />
          </div>

          {/* Submit Button */}
          <button
          disabled={loading}
            type="submit"
            className="w-full mx-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-6 group"
          >
           {loading ?"Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
