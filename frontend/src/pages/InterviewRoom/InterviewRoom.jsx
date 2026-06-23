import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Camera, CameraOff, AlertTriangle, Cpu, LogOut, ArrowRight, ArrowLeft } from 'lucide-react';
import { useInterview } from '../../hooks/useInterview';
import QuestionCard from '../../components/interview/QuestionCard';
import Timer from '../../components/interview/Timer';
import VoiceRecorder from '../../components/interview/VoiceRecorder';
import AnswerBox from '../../components/interview/AnswerBox';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './InterviewRoom.css';

export const InterviewRoom = () => {
  const { 
    currentInterview, 
    activeSession, 
    loading, 
    submitAnswer, 
    setQuestionIndex, 
    incrementDuration, 
    finishInterview, 
    cancelInterview 
  } = useInterview();

  const navigate = useNavigate();

  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(true);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [evalMessage, setEvalMessage] = useState('Evaluating responses...');

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Redirect to setup if no active session
  if (!activeSession || !currentInterview) {
    return <Navigate to="/setup" replace />;
  }

  const { questions, currentQuestionIndex, answers, durationSeconds, mode, roleName, difficulty } = currentInterview;
  const activeQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Initialize textarea when changing questions
  useEffect(() => {
    setCurrentAnswer(answers[activeQuestion.id] || '');
    setIsRecording(false);
  }, [currentQuestionIndex, activeQuestion.id, answers]);

  // Webcam stream setup
  useEffect(() => {
    if (webcamEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access failed:", err);
          setWebcamEnabled(false);
        });
    } else {
      stopWebcam();
    }

    return () => stopWebcam();
  }, [webcamEnabled]);

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleTick = (secs) => {
    incrementDuration();
  };

  const handleTranscript = (text) => {
    setCurrentAnswer(prev => prev + text);
  };

  const handleNext = () => {
    // Save current answer
    submitAnswer(activeQuestion.id, currentAnswer);
    if (!isLastQuestion) {
      setQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    submitAnswer(activeQuestion.id, currentAnswer);
    if (currentQuestionIndex > 0) {
      setQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitInterview = async () => {
    // Save final answer
    submitAnswer(activeQuestion.id, currentAnswer);
    
    // Cycle scanning messages for premium feel
    const intervals = [
      setTimeout(() => setEvalMessage('Analyzing semantic structure...'), 600),
      setTimeout(() => setEvalMessage('Scoring technical key points...'), 1200),
      setTimeout(() => setEvalMessage('Comparing vocabulary relevance...'), 1800)
    ];

    try {
      const evaluationId = await finishInterview();
      intervals.forEach(clearTimeout);
      if (evaluationId) {
        navigate(`/feedback/${evaluationId}`);
      }
    } catch (err) {
      intervals.forEach(clearTimeout);
      alert("Failed to evaluate. Please try submitting again.");
    }
  };

  const handleExitConfirm = () => {
    stopWebcam();
    cancelInterview();
    navigate('/dashboard');
  };

  return (
    <div className="interview-room-container">
      {loading ? (
        <div className="room-eval-loader glass-panel">
          <Loader size="lg" message={evalMessage} />
        </div>
      ) : (
        <>
          {/* Header Dashboard panel */}
          <div className="room-header-dashboard glass-panel">
            <div className="room-info">
              <span className="room-role-badge">{roleName}</span>
              <span className={`room-lvl-badge lvl-${difficulty.toLowerCase()}`}>{difficulty} Level</span>
            </div>
            
            <div className="room-controls">
              <Timer durationSeconds={durationSeconds} onTick={handleTick} />
              
              <button 
                type="button" 
                className="room-exit-btn" 
                onClick={() => setExitModalOpen(true)}
              >
                <LogOut size={16} />
                <span>Exit Session</span>
              </button>
            </div>
          </div>

          {/* Splitscreen Grid */}
          <div className="room-grid">
            {/* Left side: AI Interviewer */}
            <div className="room-column room-col-left">
              <Card className="interviewer-card" hoverEffect={false}>
                <div className="interviewer-title-row">
                  <div className="avatar-status-dot active"></div>
                  <Cpu size={16} className="interviewer-header-icon" />
                  <span>AI Recruiter (IntervAI)</span>
                </div>

                <div className="avatar-video-box">
                  {/* Glowing robotic speech nodes GIF */}
                  <img 
                    src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdtcm9sNzhkZHpsNDI1czB1ZmJjOHF5c3ZzNjJtMzh5ZmV5N3V2dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjei1fG/giphy.gif" 
                    alt="AI IntervAI Speaking Nodes" 
                    className="avatar-gif-video"
                  />
                  <div className="avatar-voice-bar-pulse"></div>
                </div>

                <QuestionCard
                  question={activeQuestion}
                  currentIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                />
              </Card>
            </div>

            {/* Right side: Candidate Feed & Response Box */}
            <div className="room-column room-col-right">
              <Card className="candidate-card" hoverEffect={false}>
                <div className="webcam-panel-header">
                  <span>Candidate webcam feed</span>
                  <button 
                    type="button" 
                    className="camera-toggle-pill"
                    onClick={() => setWebcamEnabled(!webcamEnabled)}
                  >
                    {webcamEnabled ? <Camera size={14} /> : <CameraOff size={14} />}
                    <span>{webcamEnabled ? "Disable Cam" : "Enable Cam"}</span>
                  </button>
                </div>

                {/* Webcam Box */}
                <div className="webcam-viewport glass-panel">
                  {webcamEnabled ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="candidate-video-stream"
                    />
                  ) : (
                    <div className="webcam-disabled-placeholder">
                      {/* Scan-line retro terminal placeholder GIF */}
                      <img 
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTVsc3F4czJkOW1hcm41YnMyeG90aXBvZWszZ3hrbXBndXFwOHV6cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5t0xK5qD6spfS57YPF/giphy.gif" 
                        alt="Security scanning feed placeholder" 
                        className="webcam-scanner-gif"
                      />
                      <div className="scanner-gif-overlay">
                        <CameraOff size={32} className="scanner-cam-icon" />
                        <p>Camera feed offline</p>
                      </div>
                    </div>
                  )}
                  <div className="camera-overlay">
                    <div className={`camera-status-dot ${webcamEnabled ? 'active' : ''}`}></div>
                    <span>REC FEED</span>
                  </div>
                </div>

                {/* Interaction Box */}
                {mode === 'voice' && (
                  <VoiceRecorder
                    onTranscript={handleTranscript}
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                  />
                )}

                <AnswerBox
                  value={currentAnswer}
                  onChange={setCurrentAnswer}
                  onClear={() => setCurrentAnswer('')}
                  onSubmit={isLastQuestion ? handleSubmitInterview : handleNext}
                  isVoiceMode={mode === 'voice'}
                  isLastQuestion={isLastQuestion}
                />
              </Card>

              {/* Navigation pagination arrows */}
              <div className="room-nav-pagination">
                <Button 
                  onClick={handlePrev} 
                  disabled={currentQuestionIndex === 0}
                  variant="secondary"
                  icon={ArrowLeft}
                >
                  Back
                </Button>
                
                {!isLastQuestion && (
                  <Button 
                    onClick={handleNext} 
                    disabled={!currentAnswer.trim()}
                    variant="secondary"
                    icon={ArrowRight}
                  >
                    Skip / Next
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Exit Confirm Modal */}
          <Modal
            isOpen={exitModalOpen}
            onClose={() => setExitModalOpen(false)}
            title="Abandon Interview Session?"
            footer={
              <>
                <Button variant="secondary" onClick={() => setExitModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleExitConfirm}>
                  Abandon Session
                </Button>
              </>
            }
          >
            <div className="exit-modal-content">
              <AlertTriangle className="exit-warning-icon" size={40} />
              <p>Warning: Leaving this room will end your session. Any transcription answers recorded so far will not be saved and no scorecard analysis will be computed.</p>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default InterviewRoom;
