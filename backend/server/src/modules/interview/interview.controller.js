import { interviewService } from './interview.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const createInterview = async (req, res, next) => {
  try {
    const { roleId, roleName, difficulty, questionsCount, mode } = req.body;
    if (!roleId || !roleName || !difficulty || !questionsCount || !mode) {
      return errorResponse(res, 'Missing required fields to configure interview', 400);
    }
    const interview = await interviewService.createInterview(req.user._id, req.body);
    return successResponse(res, interview, 201);
  } catch (error) {
    next(error);
  }
};

export const startInterview = async (req, res, next) => {
  try {
    const interview = await interviewService.startInterview(req.params.id);
    return successResponse(res, interview, 200);
  } catch (error) {
    next(error);
  }
};

export const saveAnswer = async (req, res, next) => {
  try {
    const { questionId, answer } = req.body;
    if (!questionId) {
      return errorResponse(res, 'questionId is required', 400);
    }
    const interview = await interviewService.saveAnswer(req.params.id, { questionId, answer });
    return successResponse(res, interview, 200);
  } catch (error) {
    next(error);
  }
};

export const submitInterview = async (req, res, next) => {
  try {
    const { durationSeconds } = req.body;
    const interview = await interviewService.submitInterview(req.params.id, { durationSeconds });
    return successResponse(res, interview, 200);
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const history = await interviewService.getHistory(req.user._id);
    return successResponse(res, history, 200);
  } catch (error) {
    next(error);
  }
};

export const getInterviewById = async (req, res, next) => {
  try {
    const interview = await interviewService.getInterviewById(req.params.id);
    if (!interview) {
      return errorResponse(res, 'Interview session not found', 404);
    }
    return successResponse(res, interview, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteInterview = async (req, res, next) => {
  try {
    const result = await interviewService.deleteInterview(req.params.id);
    return successResponse(res, result, 200);
  } catch (error) {
    next(error);
  }
};
