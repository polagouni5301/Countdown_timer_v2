// Utility functions for audio handling
export function createYouTubePlayer(videoId, options = {}) {
  const playerContainer = document.createElement('div');
  playerContainer.id = 'youtube-player';
  playerContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px;
  `;

  // Create controls
  const controls = document.createElement('div');
  controls.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 5px;
  `;

  // Volume control
  const volumeControl = document.createElement('input');
  volumeControl.type = 'range';
  volumeControl.min = '0';
  volumeControl.max = '100';
  volumeControl.value = options.volume || '50';
  volumeControl.style.width = '100px';

  // Mute button
  const muteButton = document.createElement('button');
  muteButton.textContent = '🔊';
  muteButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
  `;

  // Change URL button
  const changeUrlButton = document.createElement('button');
  changeUrlButton.textContent = '🔄';
  changeUrlButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
  `;

  controls.appendChild(muteButton);
  controls.appendChild(volumeControl);
  controls.appendChild(changeUrlButton);
  playerContainer.appendChild(controls);

  // Create iframe for YouTube player
  const iframe = document.createElement('iframe');
  iframe.width = '200';
  iframe.height = '50';
  iframe.allow = 'autoplay';
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=${options.autoplay || 1}&loop=${options.loop || 1}&controls=${options.controls || 0}&mute=${options.mute || 0}`;
  playerContainer.appendChild(iframe);

  // Event listeners
  let isMuted = false;
  muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? '🔇' : '🔊';
    iframe.src = iframe.src.replace(/&mute=\d/, `&mute=${isMuted ? 1 : 0}`);
  });

  changeUrlButton.addEventListener('click', () => {
    const newVideoId = prompt('Enter new YouTube video ID:', videoId);
    if (newVideoId && newVideoId !== videoId) {
      iframe.src = iframe.src.replace(videoId, newVideoId);
    }
  });

  volumeControl.addEventListener('input', (e) => {
    // Note: Volume control through iframe is limited due to YouTube API restrictions
    // This is a basic implementation
    const volume = e.target.value;
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: 'setVolume',
      args: [volume]
    }), '*');
  });

  return playerContainer;
}