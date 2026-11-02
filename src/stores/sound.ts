import { atom } from 'nanostores';

export const $soundEnabled = atom<boolean | null>(null);

const KEY = 'dw:sound';

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved !== null) $soundEnabled.set(saved === 'true');
  } catch {}
  $soundEnabled.listen((value) => {
    try { localStorage.setItem(KEY, String(value)); } catch {}
  });
}

const cache = new Map<string, HTMLAudioElement>();

export function playSound(src: string, volume = 0.2) {
  if (!$soundEnabled.get()) return;
  let audio = cache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.volume = volume;
    cache.set(src, audio);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {});
}