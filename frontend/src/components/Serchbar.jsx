import { listingDataContext } from "@/context/ListingContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ allListingData }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
const{categoryData,setCategoryData}=useContext(listingDataContext)
  // Handle typing in search box
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Unique cities from listing data that match query
    const filteredCities = [
      ...new Set(
        allListingData
          .map((item) => item.city)
          .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      ),
    ];
    console.log("Filtered Cities:", filteredCities);
    setSuggestions(filteredCities);
  };

  // Handle suggestion click
  const handleSuggestionClick = (city) => {
    setQuery(city);
    setSuggestions([]);
    setCategoryData(allListingData.filter((item) => item.city === city));

    navigate('/showcase'); // Go to city page
  };

  return (
    <div className="relative w-80  mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by city..."
        className="w-full border  rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded-lg mt-1 w-full shadow-lg z-10">
          {suggestions.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(city)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
