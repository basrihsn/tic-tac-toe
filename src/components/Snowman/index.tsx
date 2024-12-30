import { useState, useCallback, useEffect } from 'react';
import './styles.css';

interface SnowmanProps {
  position: 'left' | 'right';
}

export const Snowman = ({ position }: SnowmanProps) => {
  const [isHit, setIsHit] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);

  const throwSnowball = useCallback(() => {
    if (isThrowing) return;

    setIsThrowing(true);
    const snowball = document.createElement('div');
    snowball.className = `snowball throw-${position}`;
    document.body.appendChild(snowball);

    // Trigger hit effect on the opposite snowman
    setTimeout(() => {
      const event = new CustomEvent('snowballHit', { 
        detail: { position: position === 'left' ? 'right' : 'left' } 
      });
      document.dispatchEvent(event);
      document.body.removeChild(snowball);
      setIsThrowing(false);
    }, 1000);
  }, [position, isThrowing]);

  // Listen for hits
  useEffect(() => {
    const handleHit = (e: CustomEvent) => {
      if (e.detail.position === position) {
        setIsHit(true);
        const splash = document.createElement('div');
        splash.className = `splash ${position}`;
        document.body.appendChild(splash);

        setTimeout(() => {
          document.body.removeChild(splash);
          setIsHit(false);
        }, 500);
      }
    };

    document.addEventListener('snowballHit', handleHit as EventListener);
    return () => document.removeEventListener('snowballHit', handleHit as EventListener);
  }, [position]);

  return (
    <button 
      className={`snowman ${position} ${isHit ? 'hit' : ''}`}
      onClick={throwSnowball}
      aria-label={`${position} snowman`}
    >
      <div className="snowman-head">
        <div className="eyes">
          <div className="eye"></div>
          <div className="eye"></div>
        </div>
        <div className="nose"></div>
        <div className="mouth"></div>
      </div>
      <div className="snowman-body">
        <div className="button-top"></div>
        <div className="button-middle"></div>
        <div className="button-bottom"></div>
        <div className="arms">
          <div className={`arm left ${isThrowing ? 'throwing' : ''}`}></div>
          <div className={`arm right ${isThrowing ? 'throwing' : ''}`}></div>
        </div>
      </div>
    </button>
  );
}; 