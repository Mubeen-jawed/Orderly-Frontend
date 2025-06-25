import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessView = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll start preparing your food right away.
        </p>
        <div className="animate-pulse">
          <p className="text-sm text-gray-500">Redirecting to menu...</p>
        </div>
      </div>
    </div>
  </div>
);

export default SuccessView;
