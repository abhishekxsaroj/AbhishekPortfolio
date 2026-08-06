export type StorySceneType =
  | 'intro'
  | 'creativity'
  | 'web'
  | 'projects'
  | 'journey'
  | 'vision'
  | 'outro'

export type StoryScene = {
  id: string
  label: string
  duration: number
  type: StorySceneType
  pauseAtEnd?: boolean
}

/** Cinematic intro story — 7 scenes matching the portfolio narrative */
export const storyScenes: StoryScene[] = [
  { id: 'intro', label: 'Introduction', duration: 5200, type: 'intro' },
  { id: 'creativity', label: 'Creativity', duration: 5200, type: 'creativity' },
  { id: 'web', label: 'Web Development', duration: 5500, type: 'web' },
  { id: 'projects', label: 'Professional Projects', duration: 5500, type: 'projects' },
  { id: 'journey', label: 'Current Journey', duration: 5800, type: 'journey' },
  { id: 'vision', label: 'Future Vision', duration: 5200, type: 'vision' },
  {
    id: 'outro',
    label: 'Explore My Work',
    duration: 999999,
    type: 'outro',
    pauseAtEnd: true,
  },
]

export const PROFILE_SRC = '/profile.png'
