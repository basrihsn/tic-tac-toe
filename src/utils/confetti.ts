import confetti from 'canvas-confetti';

export const celebrateWin = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  let interval: NodeJS.Timeout;
  interval = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    confetti({
      particleCount: 25,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  }, 50);
}; 