import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Card from '../common/Card';
import './QuestionCard.css';

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Stop speaking when question changes
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [question]);

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(question.question);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <Card className="q-card" hoverEffect={false} glow={true}>
      <div className="q-card-header">
        <span className="q-badge">Question {currentIndex + 1} of {totalQuestions}</span>
        <button 
          className={`q-speak-btn ${isSpeaking ? 'active-speech' : ''}`}
          onClick={speakQuestion}
          title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
        >
          {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
          <span>{isSpeaking ? "Stop" : "Listen"}</span>
        </button>
      </div>

      <div className="q-text-content">
        <h2 className="q-question-text">{question.question}</h2>
      </div>

      <div className="q-tip-box">
        <h4 className="q-tip-title">Expected Key Terms:</h4>
        <div className="q-tips-list">
          {question.keyPoints.map((pt, i) => (
            <span key={i} className="q-tip-tag">{pt}</span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
