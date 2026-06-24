import jwt from 'jsonwebtoken';
import User from '../../../database/user.schema.js';
import env from '../../config/env.js';

const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '30d' });
};

export const authService = {
  registerUser: async ({ name, email, password, role, experience }) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('Email is already registered');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      experience
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      experience: user.experience,
      avatar: user.avatar,
      targetScore: user.targetScore,
      token: generateToken(user._id)
    };
  },

  loginUser: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found. Please sign up first.');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      experience: user.experience,
      avatar: user.avatar,
      targetScore: user.targetScore,
      token: generateToken(user._id)
    };
  },

  getProfile: async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  updateProfile: async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (updateData.name !== undefined) user.name = updateData.name;
    if (updateData.role !== undefined) user.role = updateData.role;
    if (updateData.experience !== undefined) user.experience = updateData.experience;
    if (updateData.avatar !== undefined) user.avatar = updateData.avatar;
    if (updateData.targetScore !== undefined) user.targetScore = updateData.targetScore;

    if (updateData.password !== undefined && updateData.password !== '') {
      user.password = updateData.password;
    }

    const updatedUser = await user.save();

    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      experience: updatedUser.experience,
      avatar: updatedUser.avatar,
      targetScore: updatedUser.targetScore,
      token: generateToken(updatedUser._id)
    };
  }
};
