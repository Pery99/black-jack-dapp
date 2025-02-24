const sounds = {
  card: new Audio('/sounds/card-flip.mp3'),
  win: new Audio('/sounds/win.mp3'),
  lose: new Audio('/sounds/lose.mp3'),
  chip: new Audio('/sounds/chip.mp3'),
};

export const playSound = (soundName) => {
  const settings = JSON.parse(localStorage.getItem('krankSettings'));
  if (settings?.soundEnabled) {
    sounds[soundName]?.play().catch(console.error);
  }
};
