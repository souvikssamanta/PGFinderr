import React from "react";

const Logo = ({ size = 40, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* House shape */}
      <rect x="25" y="40" width="50" height="40" rx="2" fill="#16a34a" />

      {/* Roof */}
      <polygon points="20,40 50,15 80,40" fill="#15803d" />

      {/* Door */}
      <rect x="42" y="55" width="16" height="25" rx="1" fill="white" />

      {/* Window */}
      <circle cx="35" cy="50" r="4" fill="white" />
      <circle cx="65" cy="50" r="4" fill="white" />

      {/* Search/magnifying glass element integrated into design */}
      <circle
        cx="70"
        cy="70"
        r="8"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <line x1="78" y1="78" x2="85" y2="85" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default Logo;
