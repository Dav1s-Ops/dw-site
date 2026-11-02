import * as React from 'react';
import { Button } from '@/components/ui/button';
import { playSound } from '@/stores/sound';

const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

type Props = React.ComponentProps<typeof Button> & { hoverSound?: string; clickSound?: string };

/** shadcn Button + the portfolio's sound design. Hover blips only fire on mouse devices. */
export function SoundButton({
  hoverSound = '/sounds/vk_Focus.wav',
  clickSound = '/sounds/vk_Select.wav',
  onPointerEnter,
  onClick,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      onPointerEnter={(e) => {
        if (canHover()) playSound(hoverSound);
        onPointerEnter?.(e);
      }}
      onClick={(e) => {
        playSound(clickSound);
        onClick?.(e);
      }}
    />
  );
}