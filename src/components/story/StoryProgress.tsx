import type { StoryScene } from '@/data/storyScenes'

type StoryProgressProps = {
  scenes: StoryScene[]
  index: number
  progress: number
  paused: boolean
}

export function StoryProgress({ scenes, index, progress, paused }: StoryProgressProps) {
  return (
    <div className="flex w-full gap-1 px-2 pt-2 sm:px-3 sm:pt-3" aria-hidden>
      {scenes.map((scene, i) => {
        let scale = 0
        if (i < index) scale = 1
        else if (i === index) scale = Math.min(1, Math.max(0, progress))

        return (
          <div
            key={scene.id}
            className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-white/30"
          >
            <div
              className="story-progress-fill"
              style={{
                transform: `scaleX(${scale})`,
                transition: i === index && !paused ? 'none' : 'transform 120ms linear',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
