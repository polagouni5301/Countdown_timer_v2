import confetti from 'canvas-confetti';

// Snow animation
export function createSnowEffect() {
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.opacity = Math.random();
    snowflake.style.width = `${Math.random() * 10 + 5}px`;
    
    const snowContainer = document.querySelector('.snow-container');
    snowContainer.appendChild(snowflake);

    snowflake.addEventListener('animationend', () => snowflake.remove());
  }

  return createSnowflake;
}

// Confetti animation
export function createConfettiEffect() {
  return function shootConfetti() {
    const defaults = {
      origin: { y: 0.7 },
      shapes: ['star'],
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#00FF00']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(200 * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
  };
}