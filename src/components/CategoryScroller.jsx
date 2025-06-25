import React from "react";
import { categories, restaurantConfig } from "../data/restaurantData";

const CategoryScroller = ({ activeCategory, onCategoryClick }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100 sticky top-16 z-10">
      <div className="max-w-full mx-auto px-4 my-3">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`flex-shrink-0 px-4 sm:py-2 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCategory === category.id
                  ? `${restaurantConfig.colors.primary} text-white`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScroller;
