import './style.css';
import confetti from 'canvas-confetti';
import { bikeImages } from './src/config/images.js';
import { audioConfig } from './src/config/audio.js';
import { updateBikeImages } from './src/utils/imageLoader.js';
import { createYouTubePlayer } from './src/utils/audioPlayer.js';
import { handleAudioPlayback } from './src/utils/audioManager.js';

// Update bike images
updateBikeImages(bikeImages);

// Initialize YouTube player
const player = createYouTubePlayer(audioConfig.defaultVideo.videoId, audioConfig.options);
document.body.appendChild(player);

// Set the countdown date
const countdownDate = new Date('2024-12-17T20:30:00');

// Update countdown
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate.getTime() - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  // Handle audio switching
  handleAudioPlayback(player, now);

  // Return false if countdown is finished
  return distance > 0;
}

// Create snow effect
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.style.position = 'absolute';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
  snowflake.style.opacity = Math.random();
  snowflake.style.width = Math.random() * 10 + 5 + 'px';
  snowflake.style.height = snowflake.style.width;
  snowflake.style.background = 'white';
  snowflake.style.borderRadius = '50%';
  snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
  
  const snowContainer = document.querySelector('.snow-container');
  snowContainer.appendChild(snowflake);

  // Remove snowflake after animation
  setTimeout(() => {
    snowflake.remove();
  }, 5000);
}

// Create confetti effect
function shootConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
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

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

// Add styles for snow animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fall {
    0% {
      transform: translateY(-100vh);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;
document.head.appendChild(styleSheet);

// Set up intervals
setInterval(updateCountdown, 1000);
setInterval(createSnowflake, 100);
setInterval(shootConfetti, 5000);

// Initial calls
updateCountdown();
shootConfetti();