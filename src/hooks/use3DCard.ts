import { useEffect, type RefObject } from 'react';

type Options = { intensity?: number; axis?: number; perspective?: number };

export function use3DCard(ref: RefObject<HTMLElement | null>, { intensity = 5, axis = 0.5, perspective = 800 }: Options = {}) {
  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const hw = r.width / 2, hh = r.height / 2;
      const dx = e.clientX - (r.left + hw), dy = e.clientY - (r.top + hh);
      const degree = (Math.hypot(dx, dy) * intensity) / Math.max(hw, hh);
      card.style.transform = `perspective(${perspective}px) rotate3d(${(-dy / hh) * axis}, ${(dx / hw) * axis}, 0, ${degree}deg)`;
    };
    const onLeave = () => { card.style.transform = ''; };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, intensity, axis, perspective]);
}