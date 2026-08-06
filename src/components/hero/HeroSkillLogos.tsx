import type { CSSProperties, ReactNode } from 'react'
import { DraggableFloat } from '@/components/hero/DraggableFloat'
import { cn } from '@/lib/utils'

type LogoItem = {
  id: string
  label: string
  x: string
  y: string
  size: number
  rotate?: number
  opacity?: number
  delay?: number
  icon: ReactNode
}

const stroke = 'currentColor'

function IconShell({
  children,
  viewBox = '0 0 48 48',
}: {
  children: ReactNode
  viewBox?: string
}) {
  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full"
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const logos: LogoItem[] = [
  {
    id: 'react',
    label: 'React',
    x: '8%',
    y: '18%',
    size: 52,
    rotate: -12,
    opacity: 0.09,
    delay: 0,
    icon: (
      <IconShell>
        <circle cx="24" cy="24" r="3.2" />
        <ellipse cx="24" cy="24" rx="18" ry="7" />
        <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" />
      </IconShell>
    ),
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    x: '78%',
    y: '14%',
    size: 44,
    rotate: 8,
    opacity: 0.08,
    delay: 0.3,
    icon: (
      <IconShell>
        <rect x="6" y="6" width="36" height="36" rx="6" />
        <path d="M16 20h16M24 20v14" />
      </IconShell>
    ),
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    x: '88%',
    y: '38%',
    size: 40,
    rotate: -6,
    opacity: 0.07,
    delay: 0.5,
    icon: (
      <IconShell>
        <rect x="6" y="6" width="36" height="36" rx="6" />
        <path d="M20 18v14c0 4 2 6 6 6M28 24c4 0 8 1 8 6s-4 6-8 6" />
      </IconShell>
    ),
  },
  {
    id: 'html',
    label: 'HTML',
    x: '4%',
    y: '48%',
    size: 42,
    rotate: 10,
    opacity: 0.08,
    delay: 0.15,
    icon: (
      <IconShell>
        <path d="M10 8h28l-2.5 30L24 42 12.5 38z" />
        <path d="M17 16h14l-1 12h-6l.4 5 3.6 1 3.5-1 .3-3H36l-.6 7L24 39l-11.2-3.2L12 16h5z" />
      </IconShell>
    ),
  },
  {
    id: 'css',
    label: 'CSS',
    x: '18%',
    y: '72%',
    size: 38,
    rotate: -8,
    opacity: 0.07,
    delay: 0.7,
    icon: (
      <IconShell>
        <path d="M10 8h28l-2.5 30L24 42 12.5 38z" />
        <path d="M18 18h12l-.8 8H22l.3 4 4.2 1.2 4-1.2.3-3H35l-.5 6.5L24 36.5 13.8 33.8 13 18h5z" />
      </IconShell>
    ),
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
    x: '70%',
    y: '68%',
    size: 56,
    rotate: 4,
    opacity: 0.08,
    delay: 0.4,
    icon: (
      <IconShell viewBox="0 0 48 48">
        <path d="M8 24c4-8 8-12 14-12 4.5 0 7 2.5 9 6 1.5 2.5 3 4 5 4 3 0 5.5-2 8-6-4 8-8 12-14 12-4.5 0-7-2.5-9-6-1.5-2.5-3-4-5-4-3 0-5.5 2-8 6zM8 34c4-6 7.5-9 12-9 3.5 0 5.5 2 7 4.5 1.2 2 2.5 3.5 4.5 3.5 2.5 0 5-1.8 7.5-5.5-4 6-7.5 9-12 9-3.5 0-5.5-2-7-4.5-1.2-2-2.5-3.5-4.5-3.5-2.5 0-5 1.8-7.5 5.5z" />
      </IconShell>
    ),
  },
  {
    id: 'firebase',
    label: 'Firebase',
    x: '92%',
    y: '72%',
    size: 40,
    rotate: 14,
    opacity: 0.07,
    delay: 0.9,
    icon: (
      <IconShell>
        <path d="M14 36 L20 10 L28 28z" />
        <path d="M20 10 L34 36 L14 36 L24 18z" />
        <path d="M14 36c4 4 16 4 20 0" />
      </IconShell>
    ),
  },
  {
    id: 'git',
    label: 'Git',
    x: '42%',
    y: '10%',
    size: 36,
    rotate: -4,
    opacity: 0.07,
    delay: 0.2,
    icon: (
      <IconShell>
        <circle cx="16" cy="24" r="4" />
        <circle cx="32" cy="14" r="4" />
        <circle cx="32" cy="34" r="4" />
        <path d="M20 24h8M32 18v12" />
      </IconShell>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    x: '58%',
    y: '22%',
    size: 42,
    rotate: 6,
    opacity: 0.08,
    delay: 0.6,
    icon: (
      <IconShell>
        <path d="M24 8c-9 0-16 7-16 16 0 7 4.5 13 11 15v-4c-4 .8-5.2-2-5.2-2-0.8-1.8-1.8-2.3-1.8-2.3-1.5-1 .1-.9.1-.9 1.6.1 2.5 1.7 2.5 1.7 1.5 2.5 3.8 1.8 4.8 1.4.1-1.1.6-1.8 1-2.2-3.6-.4-7.4-1.8-7.4-8 0-1.8.6-3.2 1.7-4.3-.2-.4-.7-2 .2-4.2 0 0 1.4-.4 4.5 1.6A15 15 0 0 1 24 14c1.5 0 3 .2 4.4.6 3.1-2 4.5-1.6 4.5-1.6.9 2.2.4 3.8.2 4.2 1.1 1.1 1.7 2.5 1.7 4.3 0 6.2-3.8 7.6-7.5 8 .6.5 1.1 1.5 1.1 3v5c6.5-2 11-8 11-15 0-9-7-16-16-16z" />
      </IconShell>
    ),
  },
  {
    id: 'vite',
    label: 'Vite',
    x: '30%',
    y: '28%',
    size: 40,
    rotate: -14,
    opacity: 0.07,
    delay: 0.45,
    icon: (
      <IconShell>
        <path d="M24 8 L40 38 H8z" />
        <path d="M24 14 L32 34 H16z" />
      </IconShell>
    ),
  },
  {
    id: 'figma',
    label: 'Figma',
    x: '84%',
    y: '54%',
    size: 38,
    rotate: 2,
    opacity: 0.08,
    delay: 0.75,
    icon: (
      <IconShell>
        <path d="M20 8h8a6 6 0 0 1 0 12h-8V8z" />
        <path d="M12 8h8v12h-8a6 6 0 0 1 0-12z" />
        <path d="M12 20h8v12h-8a6 6 0 0 1 0-12z" />
        <circle cx="24" cy="26" r="6" />
        <path d="M20 32h8a6 6 0 0 1 0 12h-8V32z" />
      </IconShell>
    ),
  },
  {
    id: 'wordpress',
    label: 'WordPress',
    x: '12%',
    y: '34%',
    size: 44,
    rotate: 16,
    opacity: 0.07,
    delay: 1,
    icon: (
      <IconShell>
        <circle cx="24" cy="24" r="16" />
        <path d="M12 20c3 0 5 6 8 14M16 14c6 2 8 10 10 18M36 20c-3 0-5 6-8 14M32 14c-4 2-6 10-8 18" />
      </IconShell>
    ),
  },
  {
    id: 'cursor',
    label: 'Cursor',
    x: '48%',
    y: '78%',
    size: 36,
    rotate: -10,
    opacity: 0.07,
    delay: 0.35,
    icon: (
      <IconShell>
        <rect x="8" y="8" width="32" height="32" rx="7" />
        <path d="M18 16l3 16 5-7 8 7-2-10 7-3z" />
      </IconShell>
    ),
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    x: '64%',
    y: '42%',
    size: 40,
    rotate: 11,
    opacity: 0.07,
    delay: 0.85,
    icon: (
      <IconShell>
        <path d="M24 8l8 4.5v9L24 26l-8-4.5v-9z" />
        <path d="M16 21.5l8 4.5 8-4.5v9L24 40l-8-4.5z" />
        <path d="M16 12.5L24 17l8-4.5" />
      </IconShell>
    ),
  },
  {
    id: 'vscode',
    label: 'VS Code',
    x: '36%',
    y: '58%',
    size: 38,
    rotate: 7,
    opacity: 0.06,
    delay: 1.1,
    icon: (
      <IconShell>
        <path d="M10 14l10-6 18 8v16l-18 8-10-6V14z" />
        <path d="M20 8v32M20 8l18 8M20 40l18-8" />
      </IconShell>
    ),
  },
  {
    id: 'npm',
    label: 'npm',
    x: '22%',
    y: '12%',
    size: 42,
    rotate: -3,
    opacity: 0.06,
    delay: 0.55,
    icon: (
      <IconShell>
        <rect x="8" y="12" width="32" height="24" rx="2" />
        <path d="M16 18v12M24 18v12h6V18" />
      </IconShell>
    ),
  },
  {
    id: 'seo',
    label: 'SEO',
    x: '52%',
    y: '52%',
    size: 34,
    rotate: -18,
    opacity: 0.06,
    delay: 0.95,
    icon: (
      <IconShell>
        <circle cx="20" cy="20" r="10" />
        <path d="M27 27l10 10" />
      </IconShell>
    ),
  },
]

type HeroSkillLogosProps = {
  className?: string
  active?: boolean
}

export function HeroSkillLogos({ className, active = true }: HeroSkillLogosProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-[5] overflow-hidden md:overflow-visible',
        className,
      )}
    >
      {logos.map((logo, index) => {
        const mobileSize = Math.round(logo.size * 0.72)
        return (
          <DraggableFloat
            key={logo.id}
            label={logo.label}
            absolute
            active={active}
            dropIn
            dropDelay={0.05 + index * 0.04}
            dropDistance={90 + (index % 5) * 12}
            restOpacity={logo.opacity ?? 0.08}
            floatAmplitude={5}
            floatDuration={9 + (logo.delay ?? 0) * 2}
            floatDelay={logo.delay}
            className="text-accent max-md:!h-[var(--logo-sm)] max-md:!w-[var(--logo-sm)]"
            style={
              {
                left: `min(${logo.x}, calc(100% - ${mobileSize + 8}px))`,
                top: logo.y,
                width: logo.size,
                height: logo.size,
                '--logo-sm': `${mobileSize}px`,
              } as CSSProperties
            }
          >
            <div
              style={{ transform: `rotate(${logo.rotate ?? 0}deg)` }}
              className="h-full w-full"
            >
              {logo.icon}
            </div>
          </DraggableFloat>
        )
      })}
    </div>
  )
}
