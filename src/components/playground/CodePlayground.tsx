import { useEffect, useMemo, useState } from 'react'
import SimpleCodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import { playgroundSnippets, type PlaygroundSnippet } from '@/data/playground'
import { cn } from '@/lib/utils'
import '@/styles/playground.css'

// Package is CJS; Vite/Rolldown can resolve the import as `{ default: Component }`.
const Editor =
  typeof SimpleCodeEditor === 'function'
    ? SimpleCodeEditor
    : ((SimpleCodeEditor as unknown as { default: typeof SimpleCodeEditor }).default ??
      SimpleCodeEditor)

type Pane = 'html' | 'css' | 'js'
type MobileView = 'code' | 'preview'

const paneMeta: Record<Pane, { label: string; file: string; language: string }> = {
  html: { label: 'HTML', file: 'index.html', language: 'markup' },
  css: { label: 'CSS', file: 'styles.css', language: 'css' },
  js: { label: 'JS', file: 'script.js', language: 'javascript' },
}

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

function highlightCode(code: string, pane: Pane) {
  const language = languages[paneMeta[pane].language] ?? languages.markup
  try {
    return highlight(code, language, paneMeta[pane].language)
  } catch {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
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
    <div className="playground-vscode overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#1a1a1c]/92 shadow-[0_20px_50px_rgb(0_0_0_/_0.35)] backdrop-blur-md">
      <div className="border-b border-[var(--vscode-border)] bg-[var(--vscode-sidebar)] px-3 py-3 md:px-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--vscode-muted)]">
          Templates
        </p>
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {playgroundSnippets.map((snippet) => (
            <button
              key={snippet.id}
              type="button"
              onClick={() => loadSnippet(snippet)}
              className={cn(
                'shrink-0 rounded-md px-3 py-2 text-xs transition-colors',
                snippet.id === activeId
                  ? 'bg-accent text-canvas'
                  : 'border border-white/12 bg-white/[0.04] text-[var(--vscode-muted)] hover:border-white/20 hover:text-[var(--vscode-fg)]',
              )}
            >
              {snippet.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-b border-[var(--vscode-border)] bg-[var(--vscode-tab-bar)] px-3 py-2 lg:hidden">
        {(['code', 'preview'] as const).map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setMobileView(view)}
            className={cn(
              'min-h-10 flex-1 rounded-md px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors',
              mobileView === view
                ? 'bg-[var(--vscode-tab-active)] text-[var(--vscode-fg)]'
                : 'text-[var(--vscode-muted)]',
            )}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="grid lg:min-h-[520px] lg:grid-cols-2">
        <div
          className={cn(
            'min-h-[280px] flex-col border-[var(--vscode-border)] bg-[var(--vscode-bg)] lg:flex lg:min-h-0 lg:border-r',
            mobileView === 'code' ? 'flex' : 'hidden lg:flex',
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--vscode-border)] bg-[var(--vscode-tab-bar)]">
            <div className="flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(['html', 'css', 'js'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPane(tab)}
                  className={cn(
                    'relative min-h-10 shrink-0 border-r border-[var(--vscode-border)] px-3.5 py-2.5 text-left text-xs transition-colors',
                    pane === tab
                      ? 'bg-[var(--vscode-tab-active)] text-[var(--vscode-fg)]'
                      : 'bg-[var(--vscode-tab-inactive)] text-[var(--vscode-muted)] hover:text-[var(--vscode-fg)]',
                  )}
                >
                  <span className="font-mono tracking-tight">{paneMeta[tab].file}</span>
                  {pane === tab ? (
                    <span className="absolute inset-x-0 top-0 h-0.5 bg-[var(--vscode-accent)]" />
                  ) : null}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={resetSnippet}
              className="min-h-10 shrink-0 px-3 text-xs text-[var(--vscode-muted)] transition-colors hover:text-accent-soft"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-2 border-b border-[var(--vscode-border)] bg-[var(--vscode-bg)] px-3 py-1.5">
            <span className="font-mono text-[10px] text-[var(--vscode-muted)]">
              {paneMeta[pane].label}
            </span>
            <span className="text-[10px] text-white/20">·</span>
            <span className="truncate font-mono text-[10px] text-[var(--vscode-line)]">
              {paneMeta[pane].file}
            </span>
          </div>

          <label className="sr-only" htmlFor="playground-code">
            {paneMeta[pane].label} code
          </label>
          <Editor
            value={currentValue}
            onValueChange={onChange}
            highlight={(code) => highlightCode(code, pane)}
            padding={0}
            textareaId="playground-code"
            className="playground-editor"
            textareaClassName="focus:outline-none"
            preClassName="language-markup"
            style={{
              fontFamily: "Consolas, 'Courier New', ui-monospace, monospace",
              fontSize: 13,
              minHeight: 220,
            }}
          />

          <p className="border-t border-[var(--vscode-border)] bg-[var(--vscode-sidebar)] px-4 py-2 text-[11px] text-[var(--vscode-muted)]">
            {activeSnippet.description} Edit freely — preview updates as you type.
          </p>
        </div>

        <div
          className={cn(
            'min-h-[260px] flex-col bg-[#111113] lg:flex lg:min-h-0',
            mobileView === 'preview' ? 'flex' : 'hidden lg:flex',
          )}
        >
          <div className="flex items-center justify-between border-b border-[var(--vscode-border)] bg-[var(--vscode-tab-bar)] px-3 py-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--vscode-muted)]">
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
