import React, { useState } from "react";
import { restaurantConfig, foodItems, apiConfig } from "./data/restaurantData";
import MenuView from "./views/MenuView";
import CheckoutView from "./views/CheckoutView";
import SuccessView from "./views/SuccessView";
import "./App.css";

const FoodOrderingApp = () => {
  const [cart, setCart] = useState({});
  const [currentView, setCurrentView] = useState("menu");
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    deliveryAddress: "",
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const addToCart = (itemId) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      const newCart = { ...cart };
      delete newCart[itemId];
      setCart(newCart);
    } else {
      setCart((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));
    }
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = foodItems.find((item) => item.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    const { fees } = restaurantConfig;

    const orderData = {
      restaurantName: restaurantConfig.name,
      customerDetails: {
        name: userDetails.fullName,
        phone: userDetails.phoneNumber,
        address: userDetails.deliveryAddress,
      },
      items: Object.entries(cart).map(([itemId, quantity]) => {
        const item = foodItems.find((item) => item.id === parseInt(itemId));
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: quantity,
          subtotal: item.price * quantity,
        };
      }),
      pricing: {
        subtotal: getCartTotal(),
        deliveryFee: fees.delivery,
        platformFee: fees.platform,
        total: getCartTotal() + fees.delivery + fees.platform,
      },
      orderDate: new Date().toISOString(),
    };

    try {
      console.log("Sending order data:", JSON.stringify(orderData, null, 2));

      const response = await fetch(
        "https://difficult-adrianne-mubeen-jawed-7afcfa45.koyeb.app/api/orders",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(
          `Failed to place order: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Order placed successfully:", result);

      setCurrentView("success");
      setTimeout(() => {
        setCart({});
        setUserDetails({ fullName: "", phoneNumber: "", deliveryAddress: "" });
        setCurrentView("menu");
      }, 3000);
    } catch (error) {
      console.error("Order failed:", error);
      alert(
        `Failed to place order: ${error.message}. Please check your internet connection and try again.`
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Render appropriate view based on current state
  const renderView = () => {
    switch (currentView) {
      case "menu":
        return (
          <MenuView
            cart={cart}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            getTotalItems={getTotalItems}
            setCurrentView={setCurrentView}
          />
        );
      case "checkout":
        return (
          <CheckoutView
            cart={cart}
            updateQuantity={updateQuantity}
            getCartTotal={getCartTotal}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            placeOrder={placeOrder}
            isPlacingOrder={isPlacingOrder}
            setCurrentView={setCurrentView}
          />
        );
      case "success":
        return <SuccessView />;
      default:
        return (
          <MenuView
            cart={cart}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            getTotalItems={getTotalItems}
            setCurrentView={setCurrentView}
          />
        );
    }
  };

  return <div className="font-sans">{renderView()}</div>;
};

export default FoodOrderingApp;
