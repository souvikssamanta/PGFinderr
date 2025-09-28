



import React, { useState, useEffect, useRef } from "react";
import { Flame } from "lucide-react";

const InfiniteOfferCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  const offerCards = [
    {
      id: 1,
      title: "Flat ₹2,000 Cashback",
      description: "On your first booking",
      code: "WELCOME2000",
      discount: "₹2,000 OFF",
      image: "🎁",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-600",
      timer: "04:32:15",
    },
    {
      id: 2,
      title: "Zero Security Deposit",
      description: "Book without paying security",
      code: "NOSECURITY",
      discount: "100% OFF",
      image: "🛡️",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
      timer: "12:45:30",
    },
    {
      id: 3,
      title: "Refer & Earn ₹1,000",
      description: "For every successful referral",
      code: "REFER1000",
      discount: "Earn ₹1,000",
      image: "💰",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-600",
      timer: "Always Active",
    },
    {
      id: 4,
      title: "Free Maintenance",
      description: "1 month free maintenance",
      code: "FREEMAINT",
      discount: "Free",
      image: "🔧",
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
      timer: "23:15:42",
    },
    {
      id: 5,
      title: "Early Bird Discount",
      description: "15% off on advance booking",
      code: "EARLY15",
      discount: "15% OFF",
      image: "🐦",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
      timer: "06:20:10",
    },
    {
      id: 6,
      title: "PG Special Offer",
      description: "Free meals for 1 week",
      code: "FREEFOOD",
      discount: "Free Food",
      image: "🍽️",
      bgColor: "bg-gradient-to-br from-teal-500 to-blue-600",
      timer: "18:05:25",
    },
    {
      id: 7,
      title: "No Brokerage Fee",
      description: "Zero brokerage charges",
      code: "NOBROKER",
      discount: "0% Brokerage",
      image: "🏠",
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600",
      timer: "09:45:15",
    },
    {
      id: 8,
      title: "Flexible Payment",
      description: "Pay rent monthly",
      code: "FLEXIPAY",
      discount: "Monthly Pay",
      image: "💳",
      bgColor: "bg-gradient-to-br from-lime-500 to-green-600",
      timer: "Always Active",
    },
  ];

  // Duplicate cards for infinite effect
  const duplicatedCards = [...offerCards, ...offerCards, ...offerCards];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= offerCards.length ? 0 : nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, offerCards.length]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Calculate card width based on screen size
      const cardWidth = window.innerWidth < 768 ? 280 : 320;
      scrollContainerRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="bg-gray-100 py-8 px-6 sm:px-2">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-4">
          <Flame className="inline-block animate-bounce size-6 sm:size-8 text-orange-600 mr-2" />
          Trending Offers
        </h2>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden space-x-4 sm:space-x-6 py-4 scroll-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedCards.map((offer, index) => (
            <div
              key={`${offer.id}-${index}`}
              // Responsive width: full width on mobile, fixed on larger screens
              className="flex-shrink-0 w-[280px] sm:w-80 transform hover:scale-105 transition-all duration-300"
            >
              <div
                className={`${offer.bgColor} text-white rounded-2xl p-4 sm:p-6 shadow-xl h-full`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl sm:text-3xl">{offer.image}</span>
                  <span className="text-xl sm:text-2xl font-bold">
                    {offer.discount}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  {offer.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-90 mb-4">
                  {offer.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs sm:text-sm bg-black/20 px-2 py-1 rounded">
                    Code: {offer.code}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">
                    {offer.timer}
                  </span>
                </div>
                <button className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition text-sm sm:text-base">
                  Grab Offer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile indicator dots */}
        <div className="flex justify-center space-x-2 mt-4 md:hidden">
          {offerCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-orange-500 scale-125"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteOfferCards;









