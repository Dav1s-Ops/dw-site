import { useRef } from 'react';
import { use3DCard } from '@/hooks/use3DCard';
import { playSound } from '@/stores/sound';

type Link = { label: string; href: string };
type Props = { title: string; stack: string; image: { src: string; width: number; height: number }; links: Link[] };

export function ProjectCard({ title, stack, image, links }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  use3DCard(ref);
  return (
    <div ref={ref} className="group relative overflow-hidden rounded-xl border border-gray bg-ink-radial transition-shadow hover:shadow-glow-green">
      <img src={image.src} width={image.width} height={image.height} alt="" loading="lazy" className="h-56 w-full object-cover transition-opacity [@media(hover:hover)]:group-hover:opacity-10 sm:h-72" />
      <div className="flex flex-col gap-3 p-4 [@media(hover:hover)]:absolute [@media(hover:hover)]:inset-0 [@media(hover:hover)]:items-center [@media(hover:hover)]:justify-center [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="font-display text-xs font-light text-electro-green">{stack}</p>
        <div className="flex flex-wrap gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => playSound('/sounds/vk_Focus.wav')}
              onClick={() => playSound('/sounds/vk_Select.wav')}
              className="inline-flex h-11 items-center rounded-full border border-gray bg-ink-rise px-4 font-display text-xs hover:border-electro-green"
            >{l.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}