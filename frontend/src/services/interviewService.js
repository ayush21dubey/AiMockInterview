import request from './api';

export const interviewService = {
  createInterview: async (config) => {
    return request('/interview/create', {
      method: 'POST',
      body: JSON.stringify(config)
    });
  },

  startInterview: async (id) => {
    return request(`/interview/${id}/start`, {
      method: 'POST'
    });
  },

  saveAnswer: async (id, questionId, answer) => {
    return request(`/interview/${id}/answer`, {
      method: 'POST',
      body: JSON.stringify({ questionId, answer })
    });
  },

  submitInterview: async (id, durationSeconds) => {
    return request(`/interview/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ durationSeconds })
    });
  },

  getHistory: async () => {
    return request('/interview/history');
  },

  getInterviewById: async (id) => {
    return request(`/interview/${id}`);
  },

  deleteInterview: async (id) => {
    return request(`/interview/${id}`, {
      method: 'DELETE'
    });
  }
};

export default interviewService;
