import { useEffect, useMemo, useState } from 'react'
import { playgroundSnippets, type PlaygroundSnippet } from '@/data/playground'
import { cn } from '@/lib/utils'

type Pane = 'html' | 'css' | 'js'
type MobileView = 'code' | 'preview'

function buildDocument(html: string, css: string, js: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>${css}</style>
</head>
<body>
${html}
<script>
try {
${js}
} catch (error) {
  document.body.innerHTML = '<pre style="color:#ff6b2c;padding:1rem;font:14px/1.4 monospace;">' + String(error) + '</pre>';
}
</script>
</body>
</html>`
}

export function CodePlayground() {
  const [activeId, setActiveId] = useState(playgroundSnippets[0].id)
  const activeSnippet =
    playgroundSnippets.find((item) => item.id === activeId) ?? playgroundSnippets[0]

  const [html, setHtml] = useState(activeSnippet.html)
  const [css, setCss] = useState(activeSnippet.css)
  const [js, setJs] = useState(activeSnippet.js)
  const [pane, setPane] = useState<Pane>('html')
  const [mobileView, setMobileView] = useState<MobileView>('code')
  const [draftHtml, setDraftHtml] = useState(html)
  const [draftCss, setDraftCss] = useState(css)
  const [draftJs, setDraftJs] = useState(js)

  useEffect(() => {
    setHtml(activeSnippet.html)
    setCss(activeSnippet.css)
    setJs(activeSnippet.js)
    setDraftHtml(activeSnippet.html)
    setDraftCss(activeSnippet.css)
    setDraftJs(activeSnippet.js)
    setPane('html')
  }, [activeSnippet])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHtml(draftHtml)
      setCss(draftCss)
      setJs(draftJs)
    }, 280)
    return () => window.clearTimeout(timer)
  }, [draftHtml, draftCss, draftJs])

  const srcDoc = useMemo(() => buildDocument(html, css, js), [html, css, js])

  const loadSnippet = (snippet: PlaygroundSnippet) => {
    setActiveId(snippet.id)
  }

  const resetSnippet = () => {
    setDraftHtml(activeSnippet.html)
    setDraftCss(activeSnippet.css)
    setDraftJs(activeSnippet.js)
  }

  const currentValue =
    pane === 'html' ? draftHtml : pane === 'css' ? draftCss : draftJs
  const onChange =
    pane === 'html' ? setDraftHtml : pane === 'css' ? setDraftCss : setDraftJs

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.02]">
      <div className="border-b border-white/8 px-3 py-3 md:px-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground-subtle">
          Templates
        </p>
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {playgroundSnippets.map((snippet) => (
            <button
              key={snippet.id}
              type="button"
              onClick={() => loadSnippet(snippet)}
              className={cn(
                'shrink-0 rounded-full px-3 py-2 text-xs transition-colors',
                snippet.id === activeId
                  ? 'bg-accent text-canvas'
                  : 'border border-white/10 text-foreground-muted hover:border-white/20 hover:text-foreground',
              )}
            >
              {snippet.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/8 px-3 py-2 lg:hidden">
        {(['code', 'preview'] as const).map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setMobileView(view)}
            className={cn(
              'min-h-10 flex-1 rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors',
              mobileView === view
                ? 'bg-white/[0.08] text-foreground'
                : 'text-foreground-subtle',
            )}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="grid lg:min-h-[520px] lg:grid-cols-2">
        <div
          className={cn(
            'min-h-[260px] flex-col border-white/8 lg:flex lg:min-h-0 lg:border-r',
            mobileView === 'code' ? 'flex' : 'hidden lg:flex',
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/8 px-3 py-2">
            <div className="flex gap-1">
              {(['html', 'css', 'js'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPane(tab)}
                  className={cn(
                    'min-h-10 rounded-md px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors',
                    pane === tab
                      ? 'bg-white/[0.08] text-foreground'
                      : 'text-foreground-subtle hover:text-foreground',
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={resetSnippet}
              className="min-h-10 px-2 text-xs text-foreground-subtle transition-colors hover:text-accent-soft"
            >
              Reset
            </button>
          </div>

          <label className="sr-only" htmlFor="playground-code">
            {pane.toUpperCase()} code
          </label>
          <textarea
            id="playground-code"
            spellCheck={false}
            value={currentValue}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-[220px] flex-1 resize-none bg-transparent px-4 py-3 font-mono text-[12px] leading-relaxed text-[#e8e0d4] outline-none md:text-[13px] lg:min-h-0"
          />

          <p className="border-t border-white/8 px-4 py-2 text-[11px] text-foreground-subtle">
            {activeSnippet.description} Edit freely — preview updates as you type.
          </p>
        </div>

        <div
          className={cn(
            'min-h-[260px] flex-col bg-[#07060a] lg:flex lg:min-h-0',
            mobileView === 'preview' ? 'flex' : 'hidden lg:flex',
          )}
        >
          <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-subtle">
              Live preview
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-accent-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Running
            </span>
          </div>
          <iframe
            title={`Preview: ${activeSnippet.title}`}
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className="min-h-[260px] w-full flex-1 bg-white lg:min-h-0"
          />
        </div>
      </div>
    </div>
  )
}
