export const CATEGORIES = {
  frontend:  { label: 'Frontend',  text: 'text-electro-blue',   bg: 'bg-electro-blue',   hover: 'hover:bg-electro-blue/50',   glow: 'shadow-glow-blue' },
  backend:   { label: 'Backend',   text: 'text-electro-yellow', bg: 'bg-electro-yellow', hover: 'hover:bg-electro-yellow/50', glow: 'shadow-glow-yellow' },
  fullstack: { label: 'Fullstack', text: 'text-electro-green',  bg: 'bg-electro-green',  hover: 'hover:bg-electro-green/50',  glow: 'shadow-glow-green' },
  devops:    { label: 'DevOps',    text: 'text-electro-red',    bg: 'bg-electro-red',    hover: 'hover:bg-electro-red/50',    glow: 'shadow-glow-red' },
  music:     { label: 'Music',     text: 'text-electro-purple', bg: 'bg-electro-purple', hover: 'hover:bg-electro-purple/50', glow: 'shadow-glow-purple' },
  personal:  { label: 'Personal',  text: 'text-electro-orange', bg: 'bg-electro-orange', hover: 'hover:bg-electro-orange/50', glow: 'shadow-glow-orange' },
} as const;

export type Category = keyof typeof CATEGORIES;
export const CATEGORY_KEYS = Object.keys(CATEGORIES) as [Category, ...Category[]];