import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { BsReceipt } from "react-icons/bs";

const Success = () => {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("reference");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center">
        {/* Checkmark Icon */}
        <div className="flex justify-center mb-5">
          <FaCheckCircle className="text-green-500 text-5xl" />
        </div>

        <h1 className="text-2xl font-bold text-green-600 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-5">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {paymentId && (
          <div className="bg-green-50 rounded-lg p-3 mb-6 flex items-center justify-center gap-2">
            <BsReceipt className="text-green-600" />
            <p className="text-sm font-medium">
              Transaction ID:{" "}
              <span className="text-blue-600 font-mono">{paymentId}</span>
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <FaHome /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
