import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // You can add token here when implementing JWT
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getUser = (userId) => api.get(`/auth/users/${userId}`);

// Product APIs
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const searchProducts = (keyword) => api.get(`/products/search?keyword=${keyword}`);
export const getProductsByCategory = (categoryId) => api.get(`/categories/${categoryId}/products`);

// Category APIs
export const getCategories = () => api.get('/categories');

// Cart APIs
export const getCart = (userId) => api.get(`/cart/${userId}`);
export const addToCart = (userId, item) => api.post(`/cart/${userId}/add`, item);
export const updateCartItem = (userId, itemId, quantity) => 
  api.put(`/cart/${userId}/items/${itemId}?quantity=${quantity}`);
export const removeCartItem = (userId, itemId) => 
  api.delete(`/cart/${userId}/items/${itemId}`);
export const clearCart = (userId) => api.delete(`/cart/${userId}/clear`);

// Order APIs
export const createOrder = (userId) => api.post(`/orders?userId=${userId}`);
export const getUserOrders = (userId) => api.get(`/orders/user/${userId}`);
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`);

export default api;