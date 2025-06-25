// Restaurant configuration and data
export const restaurantConfig = {
  name: "Burgeristo",
  tagline: "Fast food delivered fast",
  contact: {
    phone: "+92 300 1234567",
    email: "info@Burgeristo.pk",
  },
  social: {
    facebook: "Burgeristo",
    instagram: "Burgeristo_pk",
    twitter: "Burgeristo",
    whatsapp: "+92 300 1234567",
  },
  fees: {
    delivery: 50,
    platform: 15,
  },
  colors: {
    primary: "orange-500",
    primaryHover: "orange-600",
    secondary: "gray-500",
    success: "green-500",
    danger: "red-500",
  },
};

// Categories data
export const categories = [
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "sandwiches", name: "Sandwiches", icon: "🥪" },
  { id: "deals", name: "Deals", icon: "🔥" },
];

// Sample food items organized by category
export const foodItems = [
  {
    id: 1,
    name: "Burgeristo Zinger",
    description:
      "Our Original Signature Burger, Perfect for your late night crave",
    price: 250,
    image:
      "https://foodbreak.pk/wp-content/uploads/2024/01/Chicken-Zinger-Burger_compressed.jpg",
    hotItem: true,
    category: "burgers",
  },
  {
    id: 6,
    name: "Mighty Zinger",
    description:
      "Mighty Zinger with 150G of Lean Chicken, Perfect for overloaded hunger.",
    price: 550,
    image:
      "https://www.kfcpakistan.com/images/65428500-ea56-11ef-bf82-75f537a23a2b-Mighty_variant_0-2025-02-13220345.png",
    category: "burgers",
  },
  {
    id: 7,
    name: "Classic Beef Burger",
    description: "Juicy beef patty with fresh vegetables and special sauce",
    price: 320,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_4CgtL_6hRc9TlJOGG2ZSIjv63VE_G_5RA&s",
    category: "burgers",
  },
  {
    id: 4,
    name: "Grilled Sandwich",
    description: "Our very own Grilled Sandwich with a sprinkle of our love",
    price: 300,
    image:
      "https://californiaavocado.com/wp-content/uploads/2023/04/AvoBaconGrilledCheese_0011-1013x676.jpg",
    category: "sandwiches",
  },
  {
    id: 8,
    name: "Club Sandwich",
    description:
      "Triple layer sandwich with chicken, bacon and fresh vegetables",
    price: 420,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_4CgtL_6hRc9TlJOGG2ZSIjv63VE_G_5RA&s",
    category: "sandwiches",
  },
  {
    id: 3,
    name: "Fries",
    description: "Crispy golden fries",
    price: 100,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_4CgtL_6hRc9TlJOGG2ZSIjv63VE_G_5RA&s",
    category: "deals",
  },
  {
    id: 5,
    name: "Single Fried Chicken",
    description: "Fried Chicken with spices and herbs",
    price: 220,
    image:
      "https://aymag.com/wp-content/uploads/2025/05/falling-chicken-copy.jpg",
    category: "deals",
  },
  {
    id: 9,
    name: "Family Deal",
    description: "2 Burgers + 2 Fries + 2 Drinks - Perfect for sharing",
    price: 899,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_4CgtL_6hRc9TlJOGG2ZSIjv63VE_G_5RA&s",
    hotItem: true,
    category: "deals",
  },
];

// Top/Featured Items (can be promoted items or popular items)
export const featuredItems = [
  {
    id: 10,
    name: "Today's Special",
    description: "Chef's special combo with burger, fries and drink",
    price: 699,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_4CgtL_6hRc9TlJOGG2ZSIjv63VE_G_5RA&s",
    hotItem: true,
    category: "featured",
  },
  {
    id: 11,
    name: "Weekend Deal",
    description: "Buy 2 Burgers Get 1 Free - Limited Time Offer",
    price: 899,
    image:
      "https://foodbreak.pk/wp-content/uploads/2024/01/Chicken-Zinger-Burger_compressed.jpg",
    hotItem: true,
    category: "featured",
  },
];

// API Configuration
export const apiConfig = {
  baseUrl: "https://difficult-adrianne-mubeen-jawed-7afcfa45.koyeb.app/api",
  endpoints: {
    orders: "/orders",
  },
};
