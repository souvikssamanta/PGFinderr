import React from "react";
import { useLocation } from "react-router-dom";
import {
  XCircleIcon,
  ArrowPathIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const FailurePage = () => {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("reference");

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with X icon */}
        <div className="bg-red-100 p-6 flex flex-col items-center">
          <XCircleIcon className="h-16 w-16 text-red-600" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-2xl font-bold text-red-600 mb-4 text-center">
            Payment Failed
          </h1>

          <p className="text-gray-700 text-center mb-6">
            Oops! Something went wrong with your payment.
          </p>

          {paymentId && (
            <div className="bg-gray-50 p-3 rounded-lg mb-6 text-center">
              <p className="text-sm text-gray-600">Reference ID:</p>
              <p className="text-blue-600 font-mono text-sm font-bold break-all">
                {paymentId}
              </p>
            </div>
          )}

          <p className="text-sm text-gray-500 text-center mb-6">
            Please try again or contact our support team if the issue persists.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={() => (window.location.href = "/home")}
            >
              <HomeIcon className="h-4 w-4" />
              Go to Home
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
              onClick={() => window.location.reload()}
            >
              <ArrowPathIcon className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-3 text-center text-xs text-gray-500">
          Need help? Contact support@example.com
        </div>
      </div>
    </div>
  );
};

export default FailurePage;
