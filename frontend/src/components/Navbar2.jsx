

import { useContext, useState } from "react";
import {
  FaFire,
  FaHome,
  FaBuilding,
  FaUtensils,
  FaBed,
  FaCity,
  FaUniversity,
  FaFilter,
  FaRupeeSign,
  FaStar,
  FaBed as FaBhk,
} from "react-icons/fa";
import { listingDataContext } from "../context/ListingContext";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Navbar2() {
  const [activeItem, setActiveItem] = useState("Trending");
  const { listingData, setListingData, allListingData } =
    useContext(listingDataContext);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [rating, setRating] = useState(0);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const navItems = [
    { id: "All", icon: FaFire, label: "All" },
    { id: "PG", icon: FaBed, label: "PG" },
    { id: "Flat", icon: FaBuilding, label: "Flat" },
    { id: "Mess", icon: FaUtensils, label: "Mess" },
    { id: "Hostel", icon: FaHome, label: "Hostel" },
    // { id: "Apartment", icon: FaCity, label: "Apartment" },
    // { id: "Student", icon: FaUniversity, label: "Student Housing" },
  ];

  const bhkTypes = [
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4+ BHK",
    "Single Room",
    "Shared Room",
  ];
  const amenityOptions = [
    "WiFi",
    "AC",
    "Food",
    "Laundry",
    "Security",
    "Parking",
    "Gym",
    "Power Backup",
  ];

  const handleCategoryChange = (category) => {
    setActiveItem(category);
    if (category === "All") {
      setListingData(allListingData); // reset to full
    } else {
      setListingData(
        allListingData.filter((item) => item.category === category)
      );
    }
  };

  const applyFilters = () => {
    let filteredData = allListingData;

    // Apply category filter
    if (activeItem !== "Trending") {
      filteredData = filteredData.filter(
        (item) => item.category === activeItem
      );
    }

    // Apply price filter
    filteredData = filteredData.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Apply rating filter
    if (rating > 0) {
      filteredData = filteredData.filter((item) => item.rating >= rating);
    }

    // Apply BHK filter
    if (bhkOptions.length > 0) {
      filteredData = filteredData.filter((item) =>
        bhkOptions.includes(item.bhkType)
      );
    }

    // Apply amenities filter
    if (amenities.length > 0) {
      filteredData = filteredData.filter((item) =>
        amenities.every((amenity) => item.amenities?.includes(amenity))
      );
    }

    setListingData(filteredData);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setPriceRange([0, 50000]);
    setRating(0);
    setBhkOptions([]);
    setAmenities([]);
    setListingData(allListingData);
    setActiveItem("Trending");
  };

  const handleBhkChange = (bhk) => {
    setBhkOptions((prev) =>
      prev.includes(bhk) ? prev.filter((b) => b !== bhk) : [...prev, bhk]
    );
  };

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="w-full bg-white border-b shadow-sm sticky top-0 z-40">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "outline"}
                className={`rounded-full flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "border-gray-200 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                }`}
                onClick={() => handleCategoryChange(item.id)}
              >
                <IconComponent size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            );
          })}

          {/* Filter Button */}
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50"
              >
                <FaFilter size={14} />
                <span className="text-sm font-medium">Filters</span>
                {(priceRange[0] > 0 ||
                  priceRange[1] < 50000 ||
                  rating > 0 ||
                  bhkOptions.length > 0 ||
                  amenities.length > 0) && (
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-green-600 hover:text-green-700"
                  >
                    Reset
                  </Button>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaRupeeSign size={12} className="text-green-600" />
                    <Label className="text-sm font-medium">Price Range</Label>
                  </div>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    step={1000}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaStar size={12} className="text-yellow-500" />
                    <Label className="text-sm font-medium">
                      Minimum Rating
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant={rating >= star ? "default" : "outline"}
                        size="sm"
                        className={`h-8 w-8 p-0 rounded-full ${
                          rating >= star
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "border-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      >
                        {star}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* BHK/Room Type Filter */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaBhk size={12} className="text-green-600" />
                    <Label className="text-sm font-medium">Room Type</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {bhkTypes.map((bhk) => (
                      <div key={bhk} className="flex items-center space-x-2">
                        <Checkbox
                          id={bhk}
                          checked={bhkOptions.includes(bhk)}
                          onCheckedChange={() => handleBhkChange(bhk)}
                        />
                        <Label htmlFor={bhk} className="text-sm cursor-pointer">
                          {bhk}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaHome size={12} className="text-green-600" />
                    <Label className="text-sm font-medium">Amenities</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {amenityOptions.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={amenity}
                          checked={amenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityChange(amenity)}
                        />
                        <Label
                          htmlFor={amenity}
                          className="text-sm cursor-pointer"
                        >
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={applyFilters}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
