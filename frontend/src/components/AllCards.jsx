
import React, { useState, useRef, useContext } from "react";
import Card from "./Card";
import { ChevronRight, ChevronLeft, ChevronRightIcon } from "lucide-react";
import { listingDataContext } from "@/context/ListingContext";
import { useNavigate } from "react-router-dom";

const AllCards = ({ listingData }) => {
  const [currentIndices, setCurrentIndices] = useState({});
  const scrollContainerRefs = useRef([]);
  const navigate = useNavigate();
  const { categoryData, setCategoryData, allListingData } =
    useContext(listingDataContext);

  const handleCategoryClick = (category) => {
    setCategoryData(allListingData.filter((item) => item.city === category));
    navigate("/showcase");
  };

  const sections = [
    {
      title: "NewTown",
      gradient: "bg-gradient-to-b from-white to-blue-100",
    },
    {
      title: "Saltlake",
      gradient: "bg-gradient-to-b from-white to-green-100",
    },
    {
      title: "Mumbai",
      gradient: "bg-gradient-to-b from-white to-yellow-100",
    },
    {
      title: "Ballygunge",
      gradient: "bg-gradient-to-b from-white to-yellow-100",
    },
    {
      title: "Park Street",
      gradient: "bg-gradient-to-b from-white to-pink-100",
    },
    {
      title: "Gariahat",
      gradient: "bg-gradient-to-b from-white to-purple-100",
    },
  ];

  const scrollLeft = (sectionIndex) => {
    const container = scrollContainerRefs.current[sectionIndex];
    if (container) {
      const cardWidth = window.innerWidth < 768 ? 280 : 320;
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = (sectionIndex) => {
    const container = scrollContainerRefs.current[sectionIndex];
    if (container) {
      const cardWidth = window.innerWidth < 768 ? 280 : 320;
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      {sections.map((section, sectionIndex) => {
        const filteredListings = listingData.filter(
          (item) => item.city === section.title
        );

        if (filteredListings.length === 0) {
          return null; // Don't render section if no listings
        }

        return (
          <div key={sectionIndex} className="mb-8 relative">
            {/* Section Header */}
            <div className="flex justify-between items-center px-4 max-sm:px-10 mb-4">
              <span className="text-lg ml-5 font-semibold text-black">
                {section.title}
              </span>
              <button
                onClick={() => handleCategoryClick(section.title)}
                className="text-lg ml-5 font-semibold cursor-pointer text-black inline-flex items-center hover:text-blue-600 transition-colors"
              >
                See all <ChevronRight className="inline-block ml-1" size={20} />
              </button>
            </div>

            {/* Cards Container with Arrows */}
            <div className="relative group">
              {/* Left Arrow */}
              {filteredListings.length > 1 && (
                <button
                  onClick={() => scrollLeft(sectionIndex)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ChevronLeft size={24} className="text-gray-700" />
                </button>
              )}

              {/* Cards Scroll Container */}
              <div
                ref={(el) => (scrollContainerRefs.current[sectionIndex] = el)}
                className={`flex overflow-x-auto border-b-1 py-4 border-gray-200 ${section.gradient} flex-nowrap gap-5 px-4 max-sm:px-10 scrollbar-hide`}
              >
                {filteredListings.map((item, itemIndex) => (
                  <div
                    key={item._id}
                    className="flex-shrink-0 w-[280px] sm:w-80 transform hover:scale-105 transition-all duration-300"
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

              {/* Right Arrow */}
              {filteredListings.length > 1 && (
                <button
                  onClick={() => scrollRight(sectionIndex)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ChevronRightIcon size={24} className="text-gray-700" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCards;






