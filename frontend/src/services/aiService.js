import interviewService from './interviewService';

export const aiService = {
  /**
   * Deprecated: Use interviewService.submitInterview directly.
   * This is kept for backwards compatibility.
   */
  evaluateInterview: async (roleId, questions, answers, interviewId) => {
    console.warn("aiService.evaluateInterview is deprecated. Evaluator logic has moved to the MERN backend.");
    if (!interviewId) {
      throw new Error("interviewId is required for backend evaluation.");
    }
    return interviewService.submitInterview(interviewId, 0);
  }
};

export default aiService;
