import request from './api';

const USER_KEY = 'ai_interview_user';
const TOKEN_KEY = 'ai_interview_token';

export const authService = {
  login: async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data));
    return data;
  },

  signup: async (name, email, password, role) => {
    if (!name || !email || !password || !role) {
      throw new Error('All fields are required');
    }

    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role })
    });

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data));
    return data;
  },

  getCurrentUser: () => {
    const session = localStorage.getItem(USER_KEY);
    return session ? JSON.parse(session) : null;
  },

  updateProfile: async (updatedData) => {
    const data = await request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updatedData)
    });

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data));
    return data;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

export default authService;
