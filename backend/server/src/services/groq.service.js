import groqConfig from '../config/groq.js';
import Question from '../../database/question.schema.js';
import logger from '../utils/logger.js';

// Helper to clean JSON response from LLMs (stripping code block fences)
const cleanJSON = (text) => {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json\s*/i, '');
    cleaned = cleaned.replace(/^```\s*/, '');
    cleaned = cleaned.replace(/\s*```$/, '');
  }
  return cleaned.trim();
};

export const groqService = {
  /**
   * Generates dynamic interview questions based on role, experience and difficulty
   */
  generateQuestions: async (roleId, roleName, experience, difficulty, count) => {
    // If Groq API Key is not configured, trigger fallback immediately
    if (!groqConfig.apiKey) {
      logger.warn("GROQ_API_KEY not configured. Triggering database fallback for questions.");
      return getDatabaseFallbackQuestions(roleId, difficulty, count);
    }

    const systemPrompt = `You are a professional technical interviewer. Your task is to generate high-quality interview questions for a candidate.
You MUST output ONLY a valid JSON object. Do not wrap the JSON in markdown code blocks, do not include any introductory or concluding text, just output the raw JSON.
The JSON object must follow this schema:
{
  "questions": [
    {
      "id": "string (unique identifiers e.g. q_1, q_2)",
      "question": "string (clear, open-ended conceptual or practical design question)",
      "keyPoints": ["string (3-5 core concepts or vocabulary terms the candidate must mention in their answer)"]
    }
  ]
}`;

    const userPrompt = `Generate exactly ${count} mock interview questions for the role of "${roleName}" (Experience level: "${experience}") at a "${difficulty}" difficulty level.
Ensure the questions represent modern engineering practices and architectural challenges.`;

    try {
      const response = await fetch(groqConfig.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: groqConfig.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API responded with status ${response.status}`);
      }

      const resData = await response.json();
      const content = resData.choices[0].message.content;
      const parsed = JSON.parse(cleanJSON(content));

      if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        // Normalize IDs to make them clean
        parsed.questions = parsed.questions.slice(0, count).map((q, idx) => ({
          id: `q_${idx + 1}`,
          question: q.question,
          keyPoints: q.keyPoints || []
        }));
        return parsed.questions;
      }
      throw new Error("Invalid format returned from Groq API");
    } catch (error) {
      logger.error("Failed to generate questions using Groq API, using database fallback:", error);
      return getDatabaseFallbackQuestions(roleId, difficulty, count);
    }
  },

  /**
   * Evaluates candidate responses using Groq API
   */
  evaluateInterview: async (roleName, difficulty, questions, answers) => {
    if (!groqConfig.apiKey) {
      logger.warn("GROQ_API_KEY not configured. Triggering database fallback for evaluation.");
      return getLocalFallbackEvaluation(questions, answers);
    }

    const qaInput = questions.map(q => ({
      id: q.id,
      question: q.question,
      keyPoints: q.keyPoints,
      answer: answers[q.id] || "(No answer provided)"
    }));

    const systemPrompt = `You are an AI Interview Evaluator. Your job is to grade the candidate's answers to the interview questions.
Evaluate each response based on technical correctness, completeness, and whether they covered the requested keyPoints.
You MUST output ONLY a valid JSON object. Do not wrap the JSON in markdown code blocks, do not include any conversational text.
The JSON object must follow this schema:
{
  "overall": "string (2-3 sentences of general feedback summarizing strengths and areas of growth)",
  "score": number (overall score from 0 to 100),
  "breakdown": {
    "relevance": number (0 to 100),
    "clarity": number (0 to 100),
    "technicalDepth": number (0 to 100),
    "communication": number (0 to 100)
  },
  "qaList": [
    {
      "id": "string (matching the question id)",
      "question": "string (the question text)",
      "answer": "string (the candidate's answer)",
      "score": number (score for this specific question from 0 to 100),
      "strength": "string (what the candidate did well)",
      "improvement": "string (what details or concepts they missed and should include next time)",
      "modelAnswer": "string (a high-quality, comprehensive model answer demonstrating ideal responses)"
    }
  ]
}`;

    const userPrompt = `Evaluate this completed mock interview for a "${roleName}" position (Difficulty: "${difficulty}").
Questions & Answers:
${JSON.stringify(qaInput, null, 2)}`;

    try {
      const response = await fetch(groqConfig.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqConfig.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: groqConfig.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API responded with status ${response.status}`);
      }

      const resData = await response.json();
      const content = resData.choices[0].message.content;
      return JSON.parse(cleanJSON(content));
    } catch (error) {
      logger.error("Failed to evaluate interview using Groq API, using database fallback:", error);
      return getLocalFallbackEvaluation(questions, answers);
    }
  }
};

/**
 * Retrieves questions from local MongoDB database as a fallback
 */
async function getDatabaseFallbackQuestions(roleId, difficulty, count) {
  try {
    // Map roleId (e.g. frontend, backend) to category
    const category = roleId.toLowerCase();
    
    // Attempt to find questions in the category
    let dbQuestions = await Question.find({ category });
    
    // If not enough questions, find from any category
    if (dbQuestions.length === 0) {
      dbQuestions = await Question.find({});
    }

    // Shuffle
    const shuffled = [...dbQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    return selected.map((q, idx) => ({
      id: `q_${idx + 1}`,
      question: q.question,
      keyPoints: q.keyPoints
    }));
  } catch (err) {
    logger.error("Failed to load questions from database fallback", err);
    // Hard fallback to a static structure
    return [
      {
        id: "q_1",
        question: "Can you explain client-side rendering (CSR) and server-side rendering (SSR), and their respective trade-offs?",
        keyPoints: ["SEO impact", "Initial page load speed", "Server load", "Hydration process"]
      }
    ];
  }
}

/**
 * Performs local keyword matching fallback evaluation
 */
function getLocalFallbackEvaluation(questions, answers) {
  const qaList = questions.map((q) => {
    const userAnswer = answers[q.id] || "";
    const cleanedAnswer = userAnswer.toLowerCase();
    
    // Check keyPoints matches
    const matchedPoints = q.keyPoints.filter(point => 
      cleanedAnswer.includes(point.toLowerCase()) || 
      point.split(' ').some(word => word.length > 4 && cleanedAnswer.includes(word.toLowerCase()))
    );

    const coverageRatio = q.keyPoints.length > 0 
      ? matchedPoints.length / q.keyPoints.length 
      : 0.5;

    let score = 55; // Base score
    score += Math.round(coverageRatio * 35);
    
    if (userAnswer.length > 150) score += 5;
    if (userAnswer.length > 300) score += 5;
    if (userAnswer.length < 30) score -= 15;
    score = Math.max(30, Math.min(98, score));

    let strength = "";
    let improvement = "";

    if (score >= 80) {
      strength = "Good conceptual layout. You explained the main mechanics clearly and referenced relevant vocabulary.";
      improvement = "Deepen practical code scenarios or architectural trade-offs to round out the response.";
    } else {
      strength = "Provided basic context showing general familiarity with the topic.";
      improvement = `Ensure you discuss: ${q.keyPoints.filter(p => !matchedPoints.includes(p)).join(', ') || q.keyPoints.join(', ')}.`;
    }

    const modelAnswer = q.keyPoints.length > 0
      ? `To successfully answer, focus on detailing: ${q.keyPoints.join(', ')}. Explain how these concepts interface and their impact on scalability.`
      : "Focus on detailing execution steps, trade-offs, and typical error-handling mechanisms.";

    return {
      id: q.id,
      question: q.question,
      answer: userAnswer || "(No answer provided)",
      score,
      strength,
      improvement,
      modelAnswer
    };
  });

  const averageScore = Math.round(qaList.reduce((acc, curr) => acc + curr.score, 0) / qaList.length);

  const relevance = Math.min(100, Math.round(averageScore * 1.05));
  const clarity = Math.min(100, Math.round(averageScore * 0.98));
  const technicalDepth = Math.round(averageScore * 0.95);
  const communication = Math.min(100, Math.round(averageScore * 1.02));

  let overallSummary = "";
  if (averageScore >= 80) {
    overallSummary = "Good overall performance. You structured technical vocabulary correctly. Add more architecture designs for senior level scores.";
  } else {
    overallSummary = "Fair performance. You demonstrate standard foundational concepts, but need to mention more technical keywords and detail trade-offs.";
  }

  return {
    overall: overallSummary,
    score: averageScore,
    breakdown: {
      relevance,
      clarity,
      technicalDepth,
      communication
    },
    qaList
  };
}
