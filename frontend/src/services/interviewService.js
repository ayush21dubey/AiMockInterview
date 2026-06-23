import { MOCK_HISTORY } from '../data/mockData';

const HISTORY_KEY = 'ai_interview_history';

export const interviewService = {
  getHistory: () => {
    const history = localStorage.getItem(HISTORY_KEY);
    if (!history) {
      // Seed with mock history initially
      localStorage.setItem(HISTORY_KEY, JSON.stringify(MOCK_HISTORY));
      return MOCK_HISTORY;
    }
    return JSON.parse(history);
  },

  getInterviewById: (id) => {
    const history = interviewService.getHistory();
    return history.find(item => item.id === id) || null;
  },

  saveInterview: (interviewData) => {
    const history = interviewService.getHistory();
    
    const newRecord = {
      id: `hist_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...interviewData,
      status: "Completed"
    };

    history.unshift(newRecord); // Add to the top
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    
    // Increment total count in stats if wanted, or we compute aggregates dynamically
    return newRecord;
  },

  deleteInterview: (id) => {
    const history = interviewService.getHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  }
};
