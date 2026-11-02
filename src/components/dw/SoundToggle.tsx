import { useStore } from '@nanostores/react';
import { Volume2, VolumeX } from 'lucide-react';
import { $soundEnabled } from '@/stores/sound';
import { SoundButton } from './SoundButton';

export function SoundToggle() {
  const enabled = useStore($soundEnabled);
  return (
    <SoundButton
      variant="electro"
      size="touch"
      aria-pressed={!!enabled}
      aria-label={enabled ? 'Turn sound off' : 'Turn sound on'}
      onClick={() => $soundEnabled.set(!enabled)}
    >
      {enabled ? <Volume2 /> : <VolumeX />}
      <span className="hidden sm:inline">{enabled ? 'Sound on' : 'Sound off'}</span>
    </SoundButton>
  );
}