import React from "react";
import { Plus, Minus, Flame } from "lucide-react";
import { restaurantConfig } from "../data/restaurantData";

const ProductCard = ({ item, cart, addToCart, updateQuantity }) => {
  const quantity = cart[item.id] || 0;
  const isInCart = quantity > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 transition-all duration-200 hover:shadow-md">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
          <img
            className="rounded-xl aspect-4/3 w-full h-full object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-top">
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              {item.name}
            </h3>
            {item.hotItem && <Flame className="text-red-700 text-2xl pl-2" />}
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="sm:text-xl text-base font-bold text-green-600">
              Rs {item.price}
            </span>

            {/* Add to Cart / Quantity Controls */}
            {!isInCart ? (
              <button
                onClick={() => addToCart(item.id)}
                className={`bg-${restaurantConfig.colors.primary} hover:bg-${restaurantConfig.colors.primaryHover} text-white sm:px-4 px-2 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center sm:gap-2 gap-1 sm:text-base text-xs`}
              >
                <Plus size={16} />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(item.id, quantity - 1)}
                  className="sm:w-8 sm:h-8 w-6 h-6 rounded-full bg-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus size={14} className="text-gray-600" />
                </button>
                <span className="font-semibold text-gray-900 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, quantity + 1)}
                  className={`sm:w-8 sm:h-8 w-6 h-6 rounded-full bg-${restaurantConfig.colors.primary} flex items-center justify-center hover:bg-${restaurantConfig.colors.primaryHover} transition-colors`}
                >
                  <Plus size={14} className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
