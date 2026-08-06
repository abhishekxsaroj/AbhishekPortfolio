type SceneProps = {
  onExplore?: () => void
}

function StoryBackdrop({ variant = 'default' }: { variant?: 'default' | 'warm' | 'cool' | 'minimal' }) {
  return (
    <>
      <div className="story-bg" />
      <div className={`story-orb story-orb-a ${variant === 'cool' ? 'opacity-25' : ''}`} />
      <div className="story-orb story-orb-b" />
      {variant !== 'minimal' && <div className="story-orb story-orb-c" />}
    </>
  )
}

export function SceneIntro() {
  return (
    <div className="story-scene">
      <StoryBackdrop variant="minimal" />
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <p className="story-fade-up text-[10px] font-medium tracking-[0.32em] text-white/50 uppercase">
          Introduction
        </p>
        <h2 className="story-blur-in story-sweep mt-5 font-display text-4xl tracking-[0.08em] text-white sm:text-6xl md:text-7xl">
          ABHISHEK
        </h2>
        <div className="story-line mx-auto mt-6 w-40 sm:w-56" />
        <p className="story-fade-up story-delay-2 mt-6 text-[11px] font-medium tracking-[0.28em] text-white/70 sm:text-xs">
          CREATIVE · DIGITAL · EXPERIENCES
        </p>
      </div>
    </div>
  )
}

export function SceneCreativity() {
  return (
    <div className="story-scene">
      <StoryBackdrop variant="warm" />
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <p className="story-fade-up text-[10px] font-medium tracking-[0.32em] text-white/50 uppercase">
          Creativity
        </p>
        <p className="story-fade-up story-delay-1 mt-6 text-lg font-light italic text-white/80 sm:text-xl md:text-2xl">
          I&apos;ve always enjoyed creating things.
        </p>
        <div className="story-line mx-auto mt-8 mb-8 w-28" />
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <span className="story-chip story-delay-1">Design</span>
          <span className="story-chip story-delay-2">Content</span>
          <span className="story-chip story-delay-3">Motion</span>
        </div>
      </div>
    </div>
  )
}

export function SceneWeb() {
  const skills = ['Structure', 'Interaction', 'Systems', 'Motion', 'Craft']

  return (
    <div className="story-scene">
      <StoryBackdrop variant="cool" />
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <p className="story-fade-up text-[10px] font-medium tracking-[0.32em] text-white/50 uppercase">
          Web Development
        </p>
        <p className="story-fade-up story-delay-1 mt-6 text-base font-light text-white/75 sm:text-lg">
          Creating became building.
        </p>
        <p className="story-fade-up story-delay-2 mt-4 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          I craft for
          <br />
          the web.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {skills.map((skill, i) => (
            <span key={skill} className={`story-chip story-delay-${Math.min(i + 1, 5)}`}>
              {skill}
            </span>
          ))}
        </div>
        <div className="story-fade-up story-delay-5 mx-auto mt-10 max-w-xs rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-[75%] rounded bg-accent/40" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-[66%] rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SceneProjects() {
  const frames = [
    { label: 'Product', delay: 'story-delay-2', tone: 'bg-gradient-to-br from-accent/45 via-accent/10 to-transparent' },
    { label: 'Brand', delay: 'story-delay-3', tone: 'bg-gradient-to-br from-white/25 via-white/5 to-transparent' },
    { label: 'Web', delay: 'story-delay-4', tone: 'bg-gradient-to-br from-[#bc1888]/45 via-[#e6683c]/15 to-transparent' },
  ]

  return (
    <div className="story-scene">
      <StoryBackdrop />
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-6 text-center">
        <p className="story-fade-up text-[10px] font-medium tracking-[0.32em] text-white/50 uppercase">
          Professional Projects
        </p>
        <p className="story-fade-up story-delay-1 mt-6 text-base font-light text-white/75 sm:text-lg">
          From ideas...
        </p>
        <p className="story-fade-up story-delay-2 mt-2 font-display text-3xl text-white sm:text-4xl">
          ...to memorable products.
        </p>
        <div className="mt-10 grid w-full max-w-sm grid-cols-3 gap-2 sm:gap-3">
          {frames.map((item) => (
            <div key={item.label} className={`story-frame ${item.delay}`}>
              <div className={`aspect-[4/5] ${item.tone}`} />
              <p className="px-1 py-2 text-[9px] tracking-[0.16em] text-white/70 uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SceneJourney() {
  return (
    <div className="story-scene">
      <StoryBackdrop />
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <p className="story-fade-up text-[10px] font-medium tracking-[0.32em] text-white/50 uppercase">
          Current Journey
        </p>
        <p className="story-fade-up story-delay-1 mt-6 text-base font-light italic text-white/75 sm:text-lg">
          Creative thinking meets technology.
        </p>
        <div className="mt-12 flex flex-col items-center gap-5 sm:gap-6">
          <span className="story-scale-in text-sm tracking-[0.35em] text-white/90 sm:text-base">
            CREATIVE
          </span>
          <span className="story-merge-dot story-delay-1" />
          <span className="story-scale-in story-delay-2 text-sm tracking-[0.35em] text-white/90 sm:text-base">
            TECHNOLOGY
          </span>
          <div className="story-line story-delay-3 w-24" />
          <p className="story-blur-in story-delay-4 font-display text-2xl text-white sm:text-4xl">
            DIGITAL EXPERIENCES
          </p>
        </div>
      </div>
    </div>
  )
}

export function SceneVision() {
  return (
    <div className="story-scene">
      <StoryBackdrop variant="warm" />
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <p className="story-fade-up text-[10px] font-medium tracking-[0.32em] text-white/50 uppercase">
          Future Vision
        </p>
        <p className="story-fade-up story-delay-1 mt-6 font-display text-3xl text-white sm:text-4xl">
          Still creating.
          <br />
          Still experimenting.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="story-chip story-delay-1">Immersive Web</span>
          <span className="story-chip story-delay-2">Story Systems</span>
          <span className="story-chip story-delay-3">Product Craft</span>
        </div>
        <p className="story-fade-up story-delay-4 mt-10 text-sm font-light text-white/60">
          Building what people remember next.
        </p>
      </div>
    </div>
  )
}

export function SceneOutro({ onExplore }: SceneProps) {
  return (
    <div className="story-scene">
      <StoryBackdrop variant="minimal" />
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <p className="story-fade-up text-[10px] font-medium tracking-[0.32em] text-white/50 uppercase">
          Explore My Work
        </p>
        <h2 className="story-blur-in mt-5 font-display text-4xl tracking-[0.08em] text-white sm:text-5xl md:text-6xl">
          ABHISHEK
        </h2>
        <p className="story-fade-up story-delay-2 mt-8 text-base leading-relaxed font-light text-white/75 sm:text-lg">
          Always learning.
          <br />
          Always building.
          <br />
          Always creating.
        </p>
        <button
          type="button"
          data-story-ui
          onClick={(e) => {
            e.stopPropagation()
            onExplore?.()
          }}
          className="story-fade-up story-delay-4 mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md transition hover:bg-white/18"
        >
          Explore my work
          <span className="story-cta-arrow" aria-hidden>
            →
          </span>
        </button>
      </div>
    </div>
  )
}
