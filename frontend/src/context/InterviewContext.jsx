import React, { createContext, useState, useEffect } from 'react';
import { interviewService } from '../services/interviewService';

export const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [activeSession, setActiveSession] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    try {
      const records = await interviewService.getHistory();
      setHistory(records || []);
    } catch (err) {
      console.error("Failed to load interview history", err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const startNewInterview = async (config) => {
    setLoading(true);
    try {
      // 1. Create interview on backend (fetches dynamic questions from Groq/Fallback)
      const interview = await interviewService.createInterview(config);
      
      // 2. Start session on backend
      await interviewService.startInterview(interview._id);

      // 3. Set local context state
      setCurrentInterview({
        id: interview._id,
        roleId: interview.roleId,
        roleName: interview.roleName,
        difficulty: interview.difficulty,
        mode: interview.mode,
        questions: interview.questions,
        currentQuestionIndex: 0,
        answers: {},
        durationSeconds: 0,
        startedAt: interview.startedAt
      });
      
      setActiveSession(true);
      return interview._id;
    } catch (error) {
      console.error("Failed to start new interview session", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (questionId, answerText) => {
    if (!currentInterview) return;
    
    // Update state optimistically for UI responsiveness
    setCurrentInterview(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerText
      }
    }));

    try {
      // Save to database
      await interviewService.saveAnswer(currentInterview.id, questionId, answerText);
    } catch (error) {
      console.error("Failed to persist answer in backend", error);
    }
  };

  const setQuestionIndex = (index) => {
    if (!currentInterview) return;
    if (index >= 0 && index < currentInterview.questions.length) {
      setCurrentInterview(prev => ({
        ...prev,
        currentQuestionIndex: index
      }));
    }
  };

  const incrementDuration = () => {
    if (!currentInterview) return;
    setCurrentInterview(prev => ({
      ...prev,
      durationSeconds: prev.durationSeconds + 1
    }));
  };

  const finishInterview = async () => {
    if (!currentInterview) return null;
    setLoading(true);
    
    try {
      // Submits completed interview for Groq AI grading
      const completedRecord = await interviewService.submitInterview(
        currentInterview.id,
        currentInterview.durationSeconds
      );

      // Reload database history list
      await loadHistory();
      
      // Reset active states
      setCurrentInterview(null);
      setActiveSession(false);
      
      return completedRecord._id;
    } catch (error) {
      console.error("Failed to complete interview evaluation", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelInterview = () => {
    setCurrentInterview(null);
    setActiveSession(false);
  };

  const deleteInterviewHistory = async (id) => {
    try {
      await interviewService.deleteInterview(id);
      await loadHistory();
    } catch (error) {
      console.error("Failed to delete interview history item", error);
    }
  };

  return (
    <InterviewContext.Provider value={{
      history,
      currentInterview,
      activeSession,
      loading,
      startNewInterview,
      submitAnswer,
      setQuestionIndex,
      incrementDuration,
      finishInterview,
      cancelInterview,
      deleteInterviewHistory,
      loadHistory
    }}>
      {children}
    </InterviewContext.Provider>
  );
};

export default InterviewProvider;
