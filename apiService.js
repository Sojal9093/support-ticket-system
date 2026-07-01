// src/services/apiService.js
// Service layer for all API calls with built-in error handling and authentication

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Set token in localStorage
const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Common fetch wrapper
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
      }
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ========== AUTHENTICATION SERVICE ==========
export const authService = {
  register: async (email, password, firstName, lastName) => {
    const data = await fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  login: async (email, password) => {
    const data = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  logout: () => {
    removeToken();
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  getToken: () => {
    return getToken();
  },
};

// ========== TICKET SERVICE ==========
export const ticketService = {
  getTickets: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const queryString = params.toString();
    const url = queryString ? `/tickets?${queryString}` : '/tickets';

    return fetchWithAuth(url, {
      method: 'GET',
    });
  },

  getTicket: async (ticketId) => {
    return fetchWithAuth(`/tickets/${ticketId}`, {
      method: 'GET',
    });
  },

  createTicket: async (ticketData) => {
    return fetchWithAuth('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  },

  updateTicket: async (ticketId, updateData) => {
    return fetchWithAuth(`/tickets/${ticketId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  deleteTicket: async (ticketId) => {
    return fetchWithAuth(`/tickets/${ticketId}`, {
      method: 'DELETE',
    });
  },

  updateStatus: async (ticketId, status) => {
    return ticketService.updateTicket(ticketId, { status });
  },

  assignTicket: async (ticketId, agentId) => {
    return ticketService.updateTicket(ticketId, { assigned_to: agentId });
  },
};

// ========== COMMENT SERVICE ==========
export const commentService = {
  addComment: async (ticketId, content) => {
    return fetchWithAuth(`/tickets/${ticketId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },

  getComments: async (ticketId) => {
    const ticket = await ticketService.getTicket(ticketId);
    return ticket.comments || [];
  },
};

// ========== STATISTICS SERVICE ==========
export const statsService = {
  getDashboardStats: async () => {
    return fetchWithAuth('/stats', {
      method: 'GET',
    });
  },
};

// ========== HEALTH CHECK ==========
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};

export default {
  auth: authService,
  tickets: ticketService,
  comments: commentService,
  stats: statsService,
  healthCheck,
};