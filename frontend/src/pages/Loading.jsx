import React from "react";

const Loading = ({
  size = "medium",
  color = "blue",
  text = "Loading...",
  fullScreen = true,
}) => {
  // Size classes mapping
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-12 h-12 border-3",
    large: "w-16 h-16 border-4",
  };

  // Color classes mapping
  const colorClasses = {
    blue: "border-t-blue-500 text-blue-600",
    green: "border-t-green-500 text-green-600",
    red: "border-t-red-500 text-red-600",
    purple: "border-t-purple-500 text-purple-600",
    yellow: "border-t-yellow-500 text-yellow-600",
  };

  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "fixed inset-0" : "min-h-[200px]"
      }`}
    >
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg">
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} border-gray-200 rounded-full animate-spin`}
        ></div>
        {text && (
          <p className={`mt-4 font-medium ${colorClasses[color]}`}>{text}</p>
        )}
      </div>
    </div>
  );
};

export default Loading;
