import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import './VoiceRecorder.css';

export const VoiceRecorder = ({
  onTranscript,
  isRecording,
  setIsRecording
}) => {
  const [supportSpeech, setSupportSpeech] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check Speech Recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupportSpeech(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript && onTranscript) {
        onTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error", event.error);
      if (event.error === 'not-allowed') {
        alert("Microphone permission denied. Please allow microphone access.");
        setIsRecording(false);
      }
    };

    recognition.onend = () => {
      // Auto-restart if we didn't explicitly stop it but it timed out
      if (isRecording && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error("Failed to auto-restart recognition", e);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [onTranscript, isRecording, setIsRecording]);

  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Recognition start failed", err);
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // Might already be stopped
      }
    }
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="voice-recorder-widget">
      {!supportSpeech ? (
        <div className="speech-unsupported-error">
          <AlertCircle size={14} />
          <span>Speech Recognition is not supported in this browser. Please type your answers or use Google Chrome.</span>
        </div>
      ) : (
        <div className="voice-recorder-controls">
          <button
            type="button"
            className={`mic-trigger-btn ${isRecording ? 'recording' : ''}`}
            onClick={toggleRecording}
            title={isRecording ? "Pause Speech Recognition" : "Start Transcribing"}
          >
            {isRecording ? <Mic size={24} /> : <MicOff size={24} />}
            <span className="mic-btn-pulse"></span>
          </button>
          
          <div className="mic-status-container">
            <h4 className="mic-status-title">
              {isRecording ? "Dictation Active" : "Dictation Paused"}
            </h4>
            <p className="mic-status-desc">
              {isRecording ? "Speak clearly into your microphone..." : "Click microphone to dictate answer."}
            </p>
          </div>
        </div>
      )}

      {isRecording && (
        <div className="sound-visualizer-wave">
          <span className="wave-bar bar-1"></span>
          <span className="wave-bar bar-2"></span>
          <span className="wave-bar bar-3"></span>
          <span className="wave-bar bar-4"></span>
          <span className="wave-bar bar-5"></span>
          <span className="wave-bar bar-6"></span>
          <span className="wave-bar bar-7"></span>
          <span className="wave-bar bar-8"></span>
          <span className="wave-bar bar-9"></span>
          <span className="wave-bar bar-10"></span>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
