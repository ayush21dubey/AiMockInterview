import { INTERVIEW_QUESTIONS } from '../data/mockData';

export const aiService = {
  evaluateInterview: async (roleId, questions, answers) => {
    // Simulate complex AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const qaList = questions.map((q) => {
      const userAnswer = answers[q.id] || "";
      const cleanedAnswer = userAnswer.toLowerCase();
      
      // Look for matches with keyPoints
      const matchedPoints = q.keyPoints.filter(point => 
        cleanedAnswer.includes(point.toLowerCase()) || 
        point.split(' ').some(word => word.length > 3 && cleanedAnswer.includes(word.toLowerCase()))
      );

      const coverageRatio = q.keyPoints.length > 0 
        ? matchedPoints.length / q.keyPoints.length 
        : 0.5;

      // Calculate score based on answer length and keyword coverage
      let score = 55; // Base score
      score += Math.round(coverageRatio * 35); // Key points matching adds up to 35%
      
      if (userAnswer.length > 150) score += 5;
      if (userAnswer.length > 300) score += 5;
      if (userAnswer.length < 30) score -= 15; // Penalty for very brief answer

      score = Math.max(30, Math.min(98, score)); // Boundary check

      // Formulate feedback based on performance
      let strength = "";
      let improvement = "";

      if (score >= 85) {
        strength = "Demonstrated outstanding conceptual understanding. The answer was well-structured, directly addressing core design patterns and terminology.";
        improvement = "Try to elaborate more on real-world engineering constraints or production scaling limitations in practice.";
      } else if (score >= 70) {
        strength = "Clear explanation of the main concepts. Solid attempt to cover the key theoretical concepts.";
        improvement = `Make sure to mention specific details: ${q.keyPoints.filter(p => !matchedPoints.includes(p)).slice(0, 2).join(', ')}.`;
      } else {
        strength = "Initiated an answer with relevant context, showing a basic grasp of the topic.";
        improvement = `You missed several critical concepts. Expand your answer to explain: ${q.keyPoints.join(', ')}.`;
      }

      return {
        id: q.id,
        question: q.question,
        answer: userAnswer || "(No answer provided)",
        score,
        strength,
        improvement,
        modelAnswer: q.keyPoints.length > 0
          ? `To answer this successfully, explain ${q.keyPoints.slice(0, -1).join(', ')} and ${q.keyPoints[q.keyPoints.length - 1]}. Focus on practical design choices, benefits, and performance trade-offs.`
          : "Provide a structured breakdown of the mechanism, starting with its purpose, core execution flow, potential failure modes, and optimization strategies."
      };
    });

    const averageScore = Math.round(qaList.reduce((acc, curr) => acc + curr.score, 0) / qaList.length);

    // Dynamic breakdowns
    const relevance = Math.min(100, Math.round(averageScore * 1.05));
    const clarity = Math.min(100, Math.round(averageScore * 0.98 + (qaList.some(q => q.answer.length > 200) ? 5 : 0)));
    const technicalDepth = Math.round(averageScore * 0.95);
    const communication = Math.min(100, Math.round(averageScore * 1.02));

    // Dynamic summary review
    let overallSummary = "";
    if (averageScore >= 85) {
      overallSummary = "Excellent performance! You structure your thoughts professionally, detail high-level architectures, and show solid technical proficiency. Minor additions of architectural edge cases will push you to staff levels.";
    } else if (averageScore >= 70) {
      overallSummary = "Great attempt. You show consistent understanding of core developer profiles and operations. To boost your score, provide deeper explanations of caching, performance trade-offs, and security principles.";
    } else {
      overallSummary = "You have a solid foundation but need to work on detailing technical key points. Practicing spelling out technical steps and structures will help clarify your answers.";
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
};
