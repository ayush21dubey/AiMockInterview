const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('ai_interview_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.error || 'An error occurred during the request');
  }

  // Our standard backend returns { success: true, data: ... }
  return resData.data;
};

export default request;
