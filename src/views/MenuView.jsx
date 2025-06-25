import React, { useState, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import {
  restaurantConfig,
  categories,
  foodItems,
} from "../data/restaurantData";
import ShoppingCartComponent from "../components/ShoppingCart";
import FeaturedSection from "../components/FeaturedSection";
import ProductCard from "../components/ProductCard";
import CategoryScroller from "../components/CategoryScroller";
import Footer from "../components/Footer";

const MenuView = ({
  cart,
  addToCart,
  updateQuantity,
  getTotalItems,
  setCurrentView,
}) => {
  const [activeCategory, setActiveCategory] = useState("burgers");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categoryRefs = useRef({});

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      const headerHeight = 128; // Height of header + category scroller
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = [...foodItems].find((item) => item.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const groupedItems = categories.reduce((acc, category) => {
    acc[category.id] = foodItems.filter(
      (item) => item.category === category.id
    );
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-full mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {restaurantConfig.name}
            </h1>
            <p className="text-gray-600 text-sm">{restaurantConfig.tagline}</p>
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`relative p-2 bg-${restaurantConfig.colors.primary} text-white rounded-full hover:bg-${restaurantConfig.colors.primaryHover} transition-colors`}
          >
            <ShoppingCart size={20} />
            {getTotalItems() > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-${restaurantConfig.colors.danger} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}
              >
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Scroller */}
      <CategoryScroller
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      {/* Featured Items Section */}
      <FeaturedSection
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
      />

      {/* Menu Items by Category */}
      <div className="max-w-full mx-auto px-4 py-6 pb-24">
        {categories.map((category) => (
          <div
            key={category.id}
            ref={(el) => (categoryRefs.current[category.id] = el)}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>{category.icon}</span>
              {category.name}
            </h2>
            {groupedItems[category.id].map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                cart={cart}
                addToCart={addToCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />

      {/* Shopping Cart Sidebar */}
      <ShoppingCartComponent
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        getCartTotal={getCartTotal}
        getTotalItems={getTotalItems}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView("checkout");
        }}
      />

      {/* Sticky Checkout Button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
          <div className="max-w-full mx-auto">
            <button
              onClick={() => setCurrentView("checkout")}
              className={`w-full bg-${restaurantConfig.colors.primary} hover:bg-${restaurantConfig.colors.primaryHover} text-white sm:py-4 py-2 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-200 flex items-center justify-center gap-3`}
            >
              <ShoppingCart size={20} />
              Proceed to Checkout ({getTotalItems()} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuView;
