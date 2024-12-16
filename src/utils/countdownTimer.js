// Countdown Timer Logic
export function initializeCountdown(targetDate) {
  const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    blocks: document.querySelectorAll('.time-block')
  };

  function updateDisplay() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      Object.values(elements).forEach(el => {
        if (el.textContent) el.textContent = '00';
      });
      return false;
    }

    const times = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };

    Object.entries(times).forEach(([unit, value]) => {
      const element = elements[unit];
      const newValue = String(value).padStart(2, '0');
      
      if (element.textContent !== newValue) {
        element.classList.add('flip');
        element.textContent = newValue;
        setTimeout(() => element.classList.remove('flip'), 300);
      }
    });

    return true;
  }

  return updateDisplay;
}