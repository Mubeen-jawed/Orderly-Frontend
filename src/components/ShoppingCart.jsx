import React from "react";
import { Plus, Minus, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import {
  foodItems,
  featuredItems,
  restaurantConfig,
} from "../data/restaurantData";

const ShoppingCart = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  getCartTotal,
  getTotalItems,
  onCheckout,
}) => {
  const { delivery: deliveryFee, platform: platformFee } =
    restaurantConfig.fees;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee + platformFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex justify-center">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Cart Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Cart ({getTotalItems()})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          {Object.keys(cart).length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCartIcon
                size={48}
                className="text-gray-300 mx-auto mb-4"
              />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const item = [...foodItems, ...featuredItems].find(
                    (item) => item.id === parseInt(itemId)
                  );
                  if (!item) return null;

                  return (
                    <div
                      key={itemId}
                      className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <img
                          src={item.image}
                          className="rounded-lg w-full h-full object-cover"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">Rs {item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(parseInt(itemId), quantity - 1)
                          }
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
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
                          className={`w-6 h-6 rounded-full ${restaurantConfig.colors.primary} flex items-center justify-center ${restaurantConfig.colors.primaryHover} transition-colors`}
                        >
                          <Plus size={12} className="text-white" />
                        </button>
                      </div>
                      <span className="font-semibold text-sm text-gray-900">
                        Rs {(item.price * quantity).toFixed(0)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>Rs {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Platform Fee</span>
                  <span>Rs {platformFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className={`w-full mt-6 ${restaurantConfig.colors.primary} ${restaurantConfig.colors.primaryHover} text-white py-3 rounded-xl font-semibold transition-colors duration-200`}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
