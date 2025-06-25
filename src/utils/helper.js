/**
 * Format currency with Pakistani Rupee symbol
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `Rs ${amount.toFixed(2)}`;
};

/**
 * Calculate total price for an item including quantity
 * @param {number} price - Item price
 * @param {number} quantity - Item quantity
 * @returns {number} Total price
 */
export const calculateItemTotal = (price, quantity) => {
  return price * quantity;
};

/**
 * Calculate cart subtotal
 * @param {Object} cart - Cart object with itemId as key and quantity as value
 * @param {Array} items - Array of food items
 * @returns {number} Cart subtotal
 */
export const calculateCartSubtotal = (cart, items) => {
  return Object.entries(cart).reduce((total, [itemId, quantity]) => {
    const item = items.find((item) => item.id === parseInt(itemId));
    return total + (item ? item.price * quantity : 0);
  }, 0);
};

/**
 * Get total number of items in cart
 * @param {Object} cart - Cart object with itemId as key and quantity as value
 * @returns {number} Total number of items
 */
export const getTotalCartItems = (cart) => {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
};

/**
 * Find item by ID from multiple arrays
 * @param {number} itemId - Item ID to find
 * @param {Array} ...itemArrays - Arrays of items to search in
 * @returns {Object|null} Found item or null
 */
export const findItemById = (itemId, ...itemArrays) => {
  const allItems = itemArrays.flat();
  return allItems.find((item) => item.id === parseInt(itemId)) || null;
};

/**
 * Validate user details for checkout
 * @param {Object} userDetails - User details object
 * @returns {boolean} Whether user details are valid
 */
export const validateUserDetails = (userDetails) => {
  const { fullName, phoneNumber, deliveryAddress } = userDetails;
  return !!(fullName && phoneNumber && deliveryAddress);
};

/**
 * Generate order summary object
 * @param {Object} cart - Cart object
 * @param {Array} items - Array of all items
 * @param {Object} fees - Delivery and platform fees
 * @returns {Object} Order summary
 */
export const generateOrderSummary = (cart, items, fees) => {
  const subtotal = calculateCartSubtotal(cart, items);
  const deliveryFee = fees.delivery;
  const platformFee = fees.platform;
  const total = subtotal + deliveryFee + platformFee;

  return {
    subtotal,
    deliveryFee,
    platformFee,
    total,
    itemCount: getTotalCartItems(cart),
  };
};

/**
 * Format phone number (simple Pakistani format)
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Format as +92 XXX XXXXXXX if it starts with 92
  if (cleaned.startsWith("92") && cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }

  // Format as 0XXX XXXXXXX if it starts with 0
  if (cleaned.startsWith("0") && cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }

  return phoneNumber; // Return original if no formatting rules match
};

/**
 * Generate unique order ID
 * @returns {string} Unique order ID
 */
export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

/**
 * Check if item is a hot/featured item
 * @param {Object} item - Food item object
 * @returns {boolean} Whether item is hot/featured
 */
export const isHotItem = (item) => {
  return !!item.hotItem;
};

/**
 * Group items by category
 * @param {Array} items - Array of food items
 * @param {Array} categories - Array of categories
 * @returns {Object} Items grouped by category
 */
export const groupItemsByCategory = (items, categories) => {
  return categories.reduce((acc, category) => {
    acc[category.id] = items.filter((item) => item.category === category.id);
    return acc;
  }, {});
};
