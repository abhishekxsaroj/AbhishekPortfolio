export type Achievement = {
  id: string
  value: number
  suffix?: string
  label: string
}

export const achievements: Achievement[] = [
  { id: 'websites', value: 6, suffix: '+', label: 'Professional Websites' },
  { id: 'assets', value: 100, suffix: '+', label: 'Creative Assets' },
  { id: 'industries', value: 2, label: 'Industries Worked In' },
  { id: 'responsive', value: 100, suffix: '%', label: 'Responsive Projects' },
]
