


import React, { useContext, useState } from "react";
import {
  Home,
  Building,
  Hotel,
  Bed,
  Warehouse,
  TreePine,
  Tent,
  Store,
  ArrowLeft,
  Building2,
  Utensils,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";
import { listingDataContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ListingPage2 = () => {
  const navigate = useNavigate();
  const { category, setCategory } = useContext(listingDataContext);

  const propertyTypes = [
    {
      name: "PG",
      icon: Building2,
      description: "Paying Guest accommodation",
      color: "bg-green-100 text-green-700 border-green-200",
    },

    {
      name: "Flat",
      icon: Building,
      description: "Independent apartment or flat",
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },

    {
      name: "Mess",
      icon: Utensils,
      description: "Food service with accommodation",
      color: "bg-red-100 text-red-700 border-red-200",
    },
    {
      name: "Hotel",
      icon: Utensils,
      description: "Hotel with food and stay",
      color: "bg-blue-100 text-blue-700 border-red-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/listingpage1")}
            className="rounded-full border-gray-300 hover:border-green-600 hover:text-green-600"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-800">Property Type</h1>
            <p className="text-gray-600">
              Step 2: Select your property category
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                What type of property are you listing?
              </h2>
              <p className="text-gray-600">
                Choose the category that best describes your accommodation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {propertyTypes.map((property) => {
                const IconComponent = property.icon;
                const isSelected = category === property.name;

                return (
                  <div
                    key={property.name}
                    onClick={() => setCategory(property.name)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected
                        ? "border-green-500 bg-green-50 ring-2 ring-green-100 ring-opacity-50 scale-105"
                        : `border-gray-200 hover:border-green-300 ${property.color}`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-lg ${
                          isSelected
                            ? "bg-green-100 text-green-600"
                            : property.color.split(" ")[0]
                        }`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div className="text-left">
                        <h3
                          className={`font-semibold ${
                            isSelected ? "text-green-700" : "text-gray-800"
                          }`}
                        >
                          {property.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {property.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-3 flex justify-end">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {category && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 text-center">
                  <span className="font-semibold">Selected:</span> {category}
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => navigate("/listingpage3")}
                disabled={!category}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
              >
                Continue to Amenities
                <ArrowLeft className="ml-2 transform rotate-180" size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step 2 of 3</p>
        </div>
      </div>
    </div>
  );
};

export default ListingPage2;





