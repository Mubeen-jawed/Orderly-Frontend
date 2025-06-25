// services/api.js
import { apiConfig } from "../data/restaurantData.js";

/**
 * API service for handling HTTP requests
 */
class ApiService {
  constructor() {
    this.baseUrl = apiConfig.baseUrl;
  }

  /**
   * Generic HTTP request handler
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise} - API response
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} - API response
   */
  async get(endpoint) {
    return this.request(endpoint, {
      method: "GET",
    });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise} - API response
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise} - API response
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise} - API response
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }

  /**
   * Place a new order
   * @param {Object} orderData - Order details
   * @returns {Promise} - Order response
   */
  async placeOrder(orderData) {
    try {
      const response = await this.post(apiConfig.endpoints.orders, orderData);
      return response;
    } catch (error) {
      console.error("Failed to place order:", error);
      throw new Error("Failed to place order. Please try again.");
    }
  }

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise} - Order details
   */
  async getOrder(orderId) {
    try {
      const response = await this.get(
        `${apiConfig.endpoints.orders}/${orderId}`
      );
      return response;
    } catch (error) {
      console.error("Failed to get order:", error);
      throw new Error("Failed to retrieve order details.");
    }
  }

  /**
   * Get all orders (if needed for admin/user history)
   * @returns {Promise} - List of orders
   */
  async getOrders() {
    try {
      const response = await this.get(apiConfig.endpoints.orders);
      return response;
    } catch (error) {
      console.error("Failed to get orders:", error);
      throw new Error("Failed to retrieve orders.");
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
