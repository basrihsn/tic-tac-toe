import { useState, useEffect } from 'react';
import { celebrateWin } from '../../utils/confetti';
import './styles.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const NewYearCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmasDate = new Date(`${currentYear}-12-25T00:00:00`);
    const newYearDate = new Date(`${currentYear + 1}-01-01T00:00:00`);
    
    // Only show between Christmas and New Year
    if (now < christmasDate || now >= newYearDate) {
      setIsVisible(false);
      return;
    }

    const calculateTimeLeft = () => {
      const difference = newYearDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // New Year!
        celebrateWin();
        setIsVisible(false);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="new-year-countdown">
      <button 
        className="close-countdown" 
        onClick={() => setIsVisible(false)}
        aria-label="Close countdown"
      >
        ×
      </button>
      <p className="happy-new-year">Happy New Year</p>
      <div className="year-display">{new Date().getFullYear() + 1}</div>
      <div className="countdown-timer">
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.days}</div>
          <div className="countdown-label">DAYS</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.hours}</div>
          <div className="countdown-label">HOURS</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.minutes}</div>
          <div className="countdown-label">MINS</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.seconds}</div>
          <div className="countdown-label">SECS</div>
        </div>
      </div>
    </div>
  );
}; 