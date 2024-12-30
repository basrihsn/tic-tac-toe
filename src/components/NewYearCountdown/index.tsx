import { useState, useEffect, useRef } from 'react';
import { Fireworks } from '@fireworks-js/react';
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
  const [showFireworks, setShowFireworks] = useState(false);
  const fireworksRef = useRef(null);

  // Handle periodic fireworks
  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmasDate = new Date(`${currentYear}-12-25T00:00:00`);
    const newYearDate = new Date(`${currentYear + 1}-01-01T00:00:00`);
    
    // Only run between Christmas and New Year
    if (now >= christmasDate && now < newYearDate) {
      const interval = setInterval(() => {
        setShowFireworks(true);
        setTimeout(() => {
          setShowFireworks(false);
        }, 3000); // Show for 3 seconds
      }, 10000); // Trigger every 10 seconds

      return () => clearInterval(interval);
    }
  }, []);

  const handleMouseEnter = () => {
    setShowFireworks(true);
  };

  const handleMouseLeave = () => {
    setShowFireworks(false);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const christmasDate = new Date(`${currentYear}-12-25T00:00:00`);
      const newYearDate = new Date(`${currentYear + 1}-01-01T00:00:00`);
      
      if (now < christmasDate || now >= newYearDate) {
        setIsVisible(false);
        return;
      }

      const difference = newYearDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setShowFireworks(true);
        setIsVisible(false);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {showFireworks && (
        <Fireworks
          ref={fireworksRef}
          options={{
            opacity: 0.5,
            intensity: 20,
            rocketsPoint: {
              min: 0,
              max: 100
            }
          }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            zIndex: 1
          }}
        />
      )}
      <div 
        className="new-year-countdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
    </>
  );
}; 