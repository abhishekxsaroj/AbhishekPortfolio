# Abhishek Portfolio — Foundation

Premium portfolio architecture and design system. Dark, cinematic, and built like a product landing page.

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis smooth scrolling

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Architecture

```text
src/
  components/
    layout/       Navigation, Section, ScrollIndicator
    ui/           GlassCard, AnimatedHeading, MagneticButton,
                  GradientBackground, AnimatedCursor
    providers/    SmoothScrollProvider
  hooks/          Media, motion, scroll helpers
  lib/            cn(), animation variants
  sections/       Structural shells (content-ready placeholders)
```

## Design system

- Dark-only canvas with warm orange accents
- Glass surfaces + subtle ambient gradients/particles
- Reusable motion utilities (`fadeUp`, `stagger`, `viewportOnce`)
- Lazy-loaded section shells + vendor code splitting
- SEO meta shell + accessibility defaults (skip link, focus, reduced motion)
