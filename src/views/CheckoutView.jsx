import React from "react";
import { ArrowLeft, User, Phone, MapPin, Plus, Minus } from "lucide-react";
import {
  restaurantConfig,
  foodItems,
  featuredItems,
} from "../data/restaurantData";

const CheckoutView = ({
  cart,
  updateQuantity,
  getCartTotal,
  userDetails,
  setUserDetails,
  placeOrder,
  isPlacingOrder,
  setCurrentView,
}) => {
  const { fees } = restaurantConfig;
  const subtotal = getCartTotal();
  const total = subtotal + fees.delivery + fees.platform;
  const isFormValid =
    userDetails.fullName &&
    userDetails.phoneNumber &&
    userDetails.deliveryAddress;

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-full mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setCurrentView("menu")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 pb-24">
        {/* User Details Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Delivery Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={userDetails.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-${restaurantConfig.colors.primary} focus:border-transparent outline-none transition-all`}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={userDetails.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-${restaurantConfig.colors.primary} focus:border-transparent outline-none transition-all`}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Delivery Address
              </label>
              <textarea
                value={userDetails.deliveryAddress}
                onChange={(e) =>
                  handleInputChange("deliveryAddress", e.target.value)
                }
                className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-${restaurantConfig.colors.primary} focus:border-transparent outline-none transition-all resize-none`}
                rows="3"
                placeholder="Enter your delivery address"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {Object.entries(cart).map(([itemId, quantity]) => {
              const item = [...foodItems, ...featuredItems].find(
                (item) => item.id === parseInt(itemId)
              );
              if (!item) return null;

              return (
                <div
                  key={itemId}
                  className="sm:flex-row flex-col flex border-b-[1px] border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-lg">
                      <img
                        src={item.image}
                        className="rounded-xl aspect-4/3 w-full h-full object-cover"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Rs {item.price} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 pb-4">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-0 sm:p-1">
                      <button
                        onClick={() =>
                          updateQuantity(parseInt(itemId), quantity - 1)
                        }
                        className="sm:w-6 sm:h-6 w-5 h-5 rounded-full bg-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={12} className="text-gray-600" />
                      </button>
                      <span className="font-medium text-sm min-w-[16px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(parseInt(itemId), quantity + 1)
                        }
                        className={`sm:w-6 sm:h-6 w-5 h-5 rounded-full bg-${restaurantConfig.colors.primary} flex items-center justify-center hover:bg-${restaurantConfig.colors.primaryHover} transition-colors`}
                      >
                        <Plus size={12} className="text-white" />
                      </button>
                    </div>
                    <span className="font-semibold text-gray-900 min-w-[60px] text-right">
                      Rs {(item.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>Rs {fees.delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Platform Fee</span>
              <span>Rs {fees.platform.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={placeOrder}
            disabled={!isFormValid || isPlacingOrder}
            className={`w-full sm:py-4 py-2 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isFormValid && !isPlacingOrder
                ? `bg-${restaurantConfig.colors.success} hover:bg-green-600 text-white`
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isPlacingOrder
              ? "Placing Order..."
              : `Place Order - Rs ${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
