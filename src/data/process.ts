export type ProcessStep = {
  id: string
  title: string
  detail: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    title: 'Discover',
    detail:
      'Clarify goals, users, and constraints. Understand what the product needs to do before writing a line of code.',
  },
  {
    id: 'design',
    title: 'Design',
    detail:
      'Shape structure, hierarchy, and interaction. Keep the interface calm, intentional, and easy to extend.',
  },
  {
    id: 'develop',
    title: 'Develop',
    detail:
      'Build with clean components, responsive layouts, and modern front-end tooling. Performance is part of the craft.',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    detail:
      'Ship, validate, and refine. Make sure the experience holds up in production — not just in the mockup.',
  },
]
