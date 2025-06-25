import React from "react";
import { Plus, Minus, Flame } from "lucide-react";
import { featuredItems, restaurantConfig } from "../data/restaurantData";

const FeaturedSection = ({ cart, addToCart, updateQuantity }) => {
  if (featuredItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 py-6 mb-6">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          🔥 Featured Today
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    className="rounded-lg w-full h-full object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {item.name}
                    </h3>
                    <Flame className="text-red-500 text-lg" />
                  </div>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      Rs {item.price}
                    </span>
                    {!cart[item.id] ? (
                      <button
                        onClick={() => addToCart(item.id)}
                        className={`bg-${restaurantConfig.colors.primary} hover:bg-${restaurantConfig.colors.primaryHover} text-white px-3 py-1 rounded-lg font-medium text-xs transition-colors duration-200 flex items-center gap-1`}
                      >
                        <Plus size={12} />
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, cart[item.id] - 1)
                          }
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Minus size={10} className="text-gray-600" />
                        </button>
                        <span className="font-semibold text-sm min-w-[16px] text-center">
                          {cart[item.id]}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, cart[item.id] + 1)
                          }
                          className={`w-6 h-6 rounded-full bg-${restaurantConfig.colors.primary} flex items-center justify-center hover:bg-${restaurantConfig.colors.primaryHover} transition-colors`}
                        >
                          <Plus size={10} className="text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
