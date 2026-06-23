import React from 'react';
import { Trash2, Send } from 'lucide-react';
import Button from '../common/Button';
import './AnswerBox.css';

export const AnswerBox = ({
  value,
  onChange,
  onSubmit,
  onClear,
  isVoiceMode = false,
  isLastQuestion = false
}) => {
  const handleKeyDown = (e) => {
    // Ctrl+Enter submit shortcut
    if (e.ctrlKey && e.key === 'Enter' && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="answer-box-container">
      <div className="answer-box-header">
        <label className="answer-label" htmlFor="answer-textarea">
          {isVoiceMode ? "Your Spoken Transcript" : "Type Your Response"}
        </label>
        <span className="char-count">{value.length} characters</span>
      </div>

      <div className="textarea-wrapper">
        <textarea
          id="answer-textarea"
          className="answer-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isVoiceMode
              ? "Your microphone speech transcripts will show here in real-time. Feel free to click and edit any words manually..."
              : "Type your engineering explanation here in detail. Focus on technical depth and direct architectures. Press Ctrl+Enter to submit..."
          }
          rows={6}
        />
      </div>

      <div className="answer-actions">
        <button
          type="button"
          className="clear-btn"
          onClick={onClear}
          disabled={!value}
          title="Clear Response"
        >
          <Trash2 size={16} />
          <span>Clear</span>
        </button>

        <Button
          onClick={onSubmit}
          disabled={!value.trim()}
          variant="primary"
          icon={Send}
        >
          {isLastQuestion ? "Finish & Analyze" : "Submit Answer"}
        </Button>
      </div>
    </div>
  );
};

export default AnswerBox;
