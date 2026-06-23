import { MOCK_USER } from '../data/mockData';

const USER_KEY = 'ai_interview_user';
const SESSION_KEY = 'ai_interview_session';

export const authService = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Mock validation: check if email is registered in localStorage or matches MOCK_USER
    const storedUsers = JSON.parse(localStorage.getItem('ai_users') || '[]');
    let user = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user && email.toLowerCase() === MOCK_USER.email.toLowerCase()) {
      user = MOCK_USER;
    }

    if (!user) {
      throw new Error('User not found. Please sign up first.');
    }

    // Accept any password for mock simulation
    const sessionUser = { ...user };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  },

  signup: async (name, email, password, role) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!name || !email || !password || !role) {
      throw new Error('All fields are required');
    }

    const storedUsers = JSON.parse(localStorage.getItem('ai_users') || '[]');
    const emailExists = storedUsers.some(u => u.email.toLowerCase() === email.toLowerCase()) || 
                        email.toLowerCase() === MOCK_USER.email.toLowerCase();

    if (emailExists) {
      throw new Error('Email is already registered');
    }

    const newUser = {
      name,
      email,
      role,
      experience: "Entry-level / Mid-level",
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      targetScore: 80
    };

    storedUsers.push(newUser);
    localStorage.setItem('ai_users', JSON.stringify(storedUsers));
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

    return newUser;
  },

  getCurrentUser: () => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      return JSON.parse(session);
    }
    // Fallback: check if we should auto-seed with Sarah Jenkins
    const seeded = localStorage.getItem('ai_user_seeded');
    if (!seeded) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(MOCK_USER));
      localStorage.setItem('ai_user_seeded', 'true');
      return MOCK_USER;
    }
    return null;
  },

  updateProfile: async (updatedData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) throw new Error('Not authenticated');

    const currentUser = JSON.parse(session);
    const updatedUser = { ...currentUser, ...updatedData };

    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    
    // Also update in registered list if exists
    const storedUsers = JSON.parse(localStorage.getItem('ai_users') || '[]');
    const index = storedUsers.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (index !== -1) {
      storedUsers[index] = updatedUser;
      localStorage.setItem('ai_users', JSON.stringify(storedUsers));
    }

    return updatedUser;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};
