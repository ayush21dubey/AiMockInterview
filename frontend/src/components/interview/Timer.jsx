import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import './Timer.css';

export const Timer = ({
  durationSeconds,
  onTick
}) => {
  const [seconds, setSeconds] = useState(durationSeconds || 0);

  useEffect(() => {
    setSeconds(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        const nextSec = prev + 1;
        if (onTick) onTick(nextSec);
        return nextSec;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTick]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Warning thresholds
  const isWarning = seconds > 180; // yellow after 3 mins
  const isDanger = seconds > 300;  // red after 5 mins

  return (
    <div className={`timer-widget glass-panel ${isDanger ? 't-danger' : isWarning ? 't-warning' : ''}`}>
      <Clock size={16} className="timer-icon" />
      <span className="timer-value">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;
