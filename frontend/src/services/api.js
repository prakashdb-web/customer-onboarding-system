import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // optional timeout
});

const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data.message || 'API request failed');
    } else if (error.request) {
      // Request made but no response received
      throw new Error('No response from server');
    } else {
      // Something else
      throw new Error(error.message);
    }
  }
};

export const apiService = {
  // Get all customers
  getAllCustomers: () => handleResponse(api.get('/customers')),

  // Create a new customer
  createCustomer: (data) => handleResponse(api.post('/customers', data)),

  // Get customer by ID
  getCustomerById: (id) => handleResponse(api.get(`/customers/${id}`)),

  // Search customers
  searchCustomers: (query) => handleResponse(api.get('/customers/search', {
    params: { query },
  })),
};