import { useEffect, useCallback } from 'react';
import './styles.css';

export const Snow = () => {
  const createSnowflake = useCallback(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snow';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.opacity = `${Math.random()}`;
    snowflake.style.width = snowflake.style.height = `${Math.random() * 10 + 5}px`;
    
    return snowflake;
  }, []);

  useEffect(() => {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    document.body.appendChild(snowContainer);

    const snowflakes: HTMLDivElement[] = [];
    const snowflakeCount = 50;

    // Create initial snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = createSnowflake();
      snowContainer.appendChild(snowflake);
      snowflakes.push(snowflake);
    }

    // Continuously create new snowflakes
    const interval = setInterval(() => {
      snowflakes.forEach((flake, index) => {
        if (flake.getBoundingClientRect().top > window.innerHeight) {
          snowContainer.removeChild(flake);
          const newFlake = createSnowflake();
          snowContainer.appendChild(newFlake);
          snowflakes[index] = newFlake;
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.removeChild(snowContainer);
    };
  }, [createSnowflake]);

  return null;
}; 