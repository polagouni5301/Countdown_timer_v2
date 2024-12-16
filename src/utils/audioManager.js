import { audioConfig } from '../config/audio.js';

export function handleAudioPlayback(player, now) {
  const specialVideoTime = audioConfig.specialVideo.startTime.getTime();
  const timeUntilSpecialVideo = specialVideoTime - now;
  
  // Check if it's time to play the special video
  if (timeUntilSpecialVideo <= 0 && timeUntilSpecialVideo > -(audioConfig.specialVideo.duration * 1000)) {
    if (!player.classList.contains('playing-special')) {
      player.classList.add('playing-special');
      // Update video ID and play
      updateVideoSource(player, audioConfig.specialVideo.videoId);
    }
  } else if (!player.classList.contains('playing-default')) {
    player.classList.add('playing-default');
    updateVideoSource(player, audioConfig.defaultVideo.videoId);
  }
}

function updateVideoSource(player, videoId) {
  const currentSrc = player.querySelector('iframe').src;
  const newSrc = currentSrc.replace(/\/embed\/([^?]+)/, `/embed/${videoId}`);
  player.querySelector('iframe').src = newSrc;
  
  // Start playing
  setTimeout(() => {
    player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  }, 1000);
}