import React, { createContext, useState, useEffect } from 'react';
import { interviewService } from '../services/interviewService';
import { aiService } from '../services/aiService';
import { INTERVIEW_QUESTIONS } from '../data/mockData';

export const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [activeSession, setActiveSession] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial history fetch
    const records = interviewService.getHistory();
    setHistory(records);
  }, []);

  const loadHistory = () => {
    const records = interviewService.getHistory();
    setHistory(records);
  };

  const startNewInterview = (config) => {
    const { roleId, roleName, difficulty, questionsCount, mode } = config;
    
    // Fetch appropriate questions
    const allQuestions = INTERVIEW_QUESTIONS[roleId] || INTERVIEW_QUESTIONS.frontend;
    
    // Shuffle and slice questions based on count
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(questionsCount, allQuestions.length));

    setCurrentInterview({
      roleId,
      roleName,
      difficulty,
      mode, // 'voice' or 'text'
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: {},
      durationSeconds: 0,
      startedAt: new Date().toISOString()
    });
    
    setActiveSession(true);
  };

  const submitAnswer = (questionId, answerText) => {
    if (!currentInterview) return;
    
    setCurrentInterview(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerText
      }
    }));
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
      // Evaluate answers via AI service
      const evaluation = await aiService.evaluateInterview(
        currentInterview.roleId,
        currentInterview.questions,
        currentInterview.answers
      );

      const record = {
        role: currentInterview.roleName,
        difficulty: currentInterview.difficulty,
        score: evaluation.score,
        durationSeconds: currentInterview.durationSeconds,
        questionsCount: currentInterview.questions.length,
        feedback: evaluation
      };

      const savedRecord = interviewService.saveInterview(record);
      
      // Update history in state
      loadHistory();
      
      // Reset active interview
      setCurrentInterview(null);
      setActiveSession(false);
      
      return savedRecord.id;
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

  const deleteInterviewHistory = (id) => {
    const updated = interviewService.deleteInterview(id);
    setHistory(updated);
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
