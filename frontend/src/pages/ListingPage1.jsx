
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext";
import {
  ArrowLeft,
  Upload,
  Home,
  MapPin,
  DollarSign,
  FileText,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const ListingPage1 = () => {
  const navigate = useNavigate();
  const {
    title,
    setTitle,
    description,
    setDescription,
    frontendImage1,
    setFrontendImage1,
    frontendImage2,
    setFrontendImage2,
    frontendImage3,
    setFrontendImage3,
    backendImage1,
    setBackendImage1,
    backendImage2,
    setBackendImage2,
    backendImage3,
    setBackendImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
  } = useContext(listingDataContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/listingpage2");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full border-gray-300 hover:border-green-600 hover:text-green-600"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-800">
              List Your Property
            </h1>
            <p className="text-gray-600">Step 1: Basic Information</p>
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium flex items-center">
                  <Home className="mr-2 h-4 w-4 text-green-600" />
                  Property Title
                </Label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Cozy PG for Students in Bangalore"
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-green-600" />
                  Description
                </Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your property's features, amenities, and what makes it special..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              {/* Images */}
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium flex items-center">
                  <ImageIcon className="mr-2 h-4 w-4 text-green-600" />
                  Property Images (3 required)
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {/* Image 1 */}
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage1}
                      className="hidden"
                    />
                    <div
                      className={`h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                        frontendImage1
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                      }`}
                    >
                      {frontendImage1 ? (
                        <img
                          src={frontendImage1}
                          alt="Preview"
                          className="h-full w-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload size={20} className="text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">Image 1</span>
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
                    <div
                      className={`h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                        frontendImage2
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                      }`}
                    >
                      {frontendImage2 ? (
                        <img
                          src={frontendImage2}
                          alt="Preview"
                          className="h-full w-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload size={20} className="text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">Image 2</span>
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
                    <div
                      className={`h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                        frontendImage3
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                      }`}
                    >
                      {frontendImage3 ? (
                        <img
                          src={frontendImage3}
                          alt="Preview"
                          className="h-full w-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload size={20} className="text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">Image 3</span>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-green-600" />
                    City
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                {/* Rent */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                    Monthly Rent or Per night Rent (₹)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <Input
                      type="number"
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                      placeholder="Enter rent amount"
                      className="pl-8 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Landmark */}
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-green-600" />
                  Landmark (Optional)
                </Label>
                <Input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Enter nearby landmark"
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
              >
                Continue to Next Step
                <ArrowLeft className="ml-2 transform rotate-180" size={18} />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 1 of 3</p>
        </div>
      </div>
    </div>
  );
};

export default ListingPage1;