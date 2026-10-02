// Cheerful Kid-Friendly Web Audio Synthesizer for FUNNECT
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const isSoundEnabled = (): boolean => soundEnabled;
export const setSoundEnabled = (enabled: boolean): void => {
  soundEnabled = enabled;
};

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Cheerful Pop sound
export const playKidPop = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Ignore audio error
  }
};

// Cheerful Success Fanfare
export const playKidFanfare = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.12, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.22);
    });
  } catch {
    // Ignore audio error
  }
};

// Robot Chirp sound
export const playRobotChirp = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(740, now + 0.05);
    osc.frequency.linearRampToValueAtTime(520, now + 0.1);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch {
    // Ignore audio error
  }
};

// Motor Running Hum Sound
export const playMotorHum = (speedRatio = 0.8) => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';

    const now = ctx.currentTime;
    const baseFreq = 120 + speedRatio * 180; // 120Hz to 300Hz motor rumble
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.05, now + 0.15);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    // Low pass filter for muffled gear noise
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  } catch {
    // Ignore audio error
  }
};

// Emergency Brake Screech
export const playBrakeScreech = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // White noise / tire friction burst
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.18);
    filter.Q.setValueAtTime(3.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.19);
  } catch {
    // Ignore audio error
  }
};

// Sonar / Ultrasonic Radar Ping (Obstacle Alert)
export const playObstacleBeep = (isEmergency = false) => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    const now = ctx.currentTime;
    const freq = isEmergency ? 987.77 : 659.25; // B5 for danger, E5 for warning
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(isEmergency ? 0.15 : 0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isEmergency ? 0.18 : 0.12));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + (isEmergency ? 0.2 : 0.14));
  } catch {
    // Ignore audio error
  }
};

// Micro Servo Rotation Whir
export const playServoWhir = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(380, now + 0.1);
    osc.frequency.linearRampToValueAtTime(240, now + 0.2);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch {
    // Ignore audio error
  }
};
