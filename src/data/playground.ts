export type PlaygroundSnippet = {
  id: string
  title: string
  description: string
  html: string
  css: string
  js: string
}

export const playgroundSnippets: PlaygroundSnippet[] = [
  {
    id: 'gradient-hero',
    title: 'Gradient Hero',
    description: 'Bold headline with animated gradient text.',
    html: `<main class="wrap">
  <p class="eyebrow">Front-end playground</p>
  <h1>Build something <span>memorable</span>.</h1>
  <button>Get started</button>
</main>`,
    css: `* { box-sizing: border-box; margin: 0; }
body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: Georgia, serif;
  background: #0b0a0f;
  color: #f4efe8;
}
.wrap { text-align: center; padding: 2rem; }
.eyebrow {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font: 600 0.7rem/1 system-ui, sans-serif;
  color: #ff8a4c;
  margin-bottom: 1rem;
}
h1 { font-size: clamp(2rem, 6vw, 3.4rem); line-height: 1.05; }
h1 span {
  background: linear-gradient(90deg, #ff6b2c, #ffb347, #ff6b2c);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shine 3s linear infinite;
}
button {
  margin-top: 1.5rem;
  border: 0;
  border-radius: 999px;
  padding: 0.85rem 1.4rem;
  background: #ff6b2c;
  color: #120e0a;
  font: 600 0.9rem/1 system-ui, sans-serif;
  cursor: pointer;
}
@keyframes shine {
  to { background-position: 200% center; }
}`,
    js: `document.querySelector('button')?.addEventListener('click', () => {
  alert('Nice — now tweak the styles!');
});`,
  },
  {
    id: 'glass-card',
    title: 'Glass Card',
    description: 'Frosted glass UI on a warm gradient.',
    html: `<div class="scene">
  <article class="card">
    <p class="label">Profile</p>
    <h2>Abhishek Saroj</h2>
    <p>Front-end developer crafting fast, modern web experiences.</p>
    <div class="row">
      <span>React</span><span>TypeScript</span><span>CSS</span>
    </div>
  </article>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  background:
    radial-gradient(circle at 20% 20%, #ff6b2c55, transparent 35%),
    radial-gradient(circle at 80% 70%, #bc188855, transparent 30%),
    #0b0a0f;
  color: #f5f2ec;
}
.card {
  width: min(340px, 90vw);
  padding: 1.5rem;
  border-radius: 1.4rem;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.35);
}
.label {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ff8a4c;
}
h2 { margin: 0.6rem 0 0.5rem; font-size: 1.6rem; }
p { margin: 0; color: #c9c2b8; line-height: 1.5; font-size: 0.95rem; }
.row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
.row span {
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  padding: 0.3rem 0.65rem;
  font-size: 0.72rem;
  color: #ddd6cc;
}`,
    js: '',
  },
  {
    id: 'counter',
    title: 'JS Counter',
    description: 'Simple state with vanilla JavaScript.',
    html: `<div class="box">
  <h1 id="count">0</h1>
  <div class="actions">
    <button id="dec">−</button>
    <button id="reset">Reset</button>
    <button id="inc">+</button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #111018;
  color: white;
  font-family: system-ui, sans-serif;
}
.box { text-align: center; }
h1 { font-size: 5rem; margin: 0 0 1rem; }
.actions { display: flex; gap: 0.6rem; }
button {
  border: 1px solid rgba(255,255,255,0.15);
  background: #1c1824;
  color: white;
  border-radius: 0.7rem;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
button:hover { border-color: #ff6b2c; color: #ff6b2c; }`,
    js: `let n = 0;
const el = document.getElementById('count');
const render = () => { el.textContent = String(n); };
document.getElementById('inc').onclick = () => { n += 1; render(); };
document.getElementById('dec').onclick = () => { n -= 1; render(); };
document.getElementById('reset').onclick = () => { n = 0; render(); };`,
  },
  {
    id: 'todo',
    title: 'Mini Todo',
    description: 'Add and complete tasks live.',
    html: `<div class="app">
  <h2>Today</h2>
  <form id="form">
    <input id="input" placeholder="Add a task..." autocomplete="off" />
    <button type="submit">Add</button>
  </form>
  <ul id="list"></ul>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0d0c12;
  color: #f2efe8;
  font-family: system-ui, sans-serif;
}
.app {
  width: min(360px, 92vw);
  background: #17141f;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1rem;
  padding: 1.2rem;
}
h2 { margin: 0 0 1rem; }
form { display: flex; gap: 0.5rem; }
input, button {
  border-radius: 0.6rem;
  border: 1px solid rgba(255,255,255,0.12);
  background: #0f0d14;
  color: inherit;
  padding: 0.65rem 0.75rem;
}
input { flex: 1; }
button { background: #ff6b2c; border-color: #ff6b2c; color: #1a100a; font-weight: 600; cursor: pointer; }
ul { list-style: none; padding: 0; margin: 1rem 0 0; }
li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  font-size: 0.92rem;
}
li.done span { text-decoration: line-through; opacity: 0.5; }
li button {
  margin-left: auto;
  background: transparent;
  border: 0;
  color: #aaa;
  cursor: pointer;
}`,
    js: `const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.innerHTML = \`<input type="checkbox" /><span>\${text}</span><button aria-label="Delete">✕</button>\`;
  li.querySelector('input').onchange = (ev) => {
    li.classList.toggle('done', ev.target.checked);
  };
  li.querySelector('button').onclick = () => li.remove();
  list.prepend(li);
  input.value = '';
});`,
  },
  {
    id: 'loader',
    title: 'CSS Loader',
    description: 'Pure CSS spinning loader animation.',
    html: `<div class="stage">
  <div class="loader"></div>
  <p>Loading experience…</p>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0a090e;
  color: #d7d0c6;
  font-family: system-ui, sans-serif;
}
.stage { text-align: center; }
.loader {
  width: 54px;
  height: 54px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #ff6b2c;
  animation: spin 0.8s linear infinite;
}
p { letter-spacing: 0.08em; font-size: 0.85rem; }
@keyframes spin { to { transform: rotate(360deg); } }`,
    js: '',
  },
  {
    id: 'buttons',
    title: 'Magnetic Buttons',
    description: 'Hover states and neon outline CTAs.',
    html: `<div class="row">
  <button class="fill">Primary</button>
  <button class="ghost">Secondary</button>
  <button class="neon">Neon</button>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0c0b11;
  font-family: system-ui, sans-serif;
}
.row { display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; }
button {
  border-radius: 999px;
  padding: 0.85rem 1.35rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
button:hover { transform: translateY(-2px); }
.fill {
  border: 0;
  background: #ff6b2c;
  color: #17100c;
  box-shadow: 0 10px 30px rgba(255,107,44,0.25);
}
.ghost {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #f3efe7;
}
.ghost:hover { border-color: #ff6b2c; color: #ff6b2c; }
.neon {
  background: #120f18;
  border: 1px solid #ff6b2c;
  color: #ff6b2c;
  box-shadow: 0 0 0 rgba(255,107,44,0);
}
.neon:hover { box-shadow: 0 0 24px rgba(255,107,44,0.35); }`,
    js: '',
  },
  {
    id: 'grid-gallery',
    title: 'CSS Grid Gallery',
    description: 'Responsive mosaic with hover zoom.',
    html: `<div class="grid">
  <div class="tile a">A</div>
  <div class="tile b">B</div>
  <div class="tile c">C</div>
  <div class="tile d">D</div>
  <div class="tile e">E</div>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0b0a10;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}
.grid {
  width: min(420px, 94vw);
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  grid-template-rows: 120px 120px;
  gap: 0.6rem;
}
.tile {
  border-radius: 1rem;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  overflow: hidden;
  transition: transform 0.25s ease;
}
.tile:hover { transform: scale(1.03); }
.a { grid-row: span 2; background: linear-gradient(160deg, #ff6b2c, #8a2a12); }
.b { background: linear-gradient(160deg, #3b82f6, #1e3a8a); }
.c { background: linear-gradient(160deg, #bc1888, #4a0f3a); }
.d { background: linear-gradient(160deg, #22c55e, #14532d); }
.e { background: linear-gradient(160deg, #f59e0b, #78350f); }`,
    js: '',
  },
  {
    id: 'typewriter',
    title: 'Typewriter',
    description: 'Text types out with a blinking caret.',
    html: `<h1><span id="text"></span><span class="caret">|</span></h1>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0a090e;
  color: #f4efe8;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
h1 { font-size: clamp(1.2rem, 4vw, 1.8rem); font-weight: 500; }
.caret { color: #ff6b2c; animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }`,
    js: `const lines = [
  'I build fast web experiences.',
  'React · TypeScript · CSS.',
  'Edit this and press play in your mind.',
];
const el = document.getElementById('text');
let line = 0, i = 0, deleting = false;

function tick() {
  const current = lines[line];
  el.textContent = current.slice(0, i);
  if (!deleting && i < current.length) {
    i += 1;
    setTimeout(tick, 70);
  } else if (!deleting && i === current.length) {
    deleting = true;
    setTimeout(tick, 1200);
  } else if (deleting && i > 0) {
    i -= 1;
    setTimeout(tick, 35);
  } else {
    deleting = false;
    line = (line + 1) % lines.length;
    setTimeout(tick, 250);
  }
}
tick();`,
  },
  {
    id: 'pricing',
    title: 'Pricing Card',
    description: 'Clean product card with CTA.',
    html: `<section class="card">
  <p class="plan">Pro</p>
  <h2>$19<span>/mo</span></h2>
  <ul>
    <li>Unlimited projects</li>
    <li>Live preview sandbox</li>
    <li>Priority support</li>
  </ul>
  <button>Choose plan</button>
</section>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #101018;
  font-family: system-ui, sans-serif;
  color: #f5f1ea;
}
.card {
  width: min(300px, 90vw);
  padding: 1.5rem;
  border-radius: 1.25rem;
  background: linear-gradient(180deg, #1b1724, #13111a);
  border: 1px solid rgba(255,255,255,0.08);
}
.plan {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(255,107,44,0.15);
  color: #ff8a4c;
  font-size: 0.75rem;
  font-weight: 700;
}
h2 { margin: 0.8rem 0; font-size: 2.6rem; }
h2 span { font-size: 1rem; color: #9b948a; font-weight: 500; }
ul { padding-left: 1.1rem; color: #c9c2b8; line-height: 1.8; margin: 0 0 1.2rem; }
button {
  width: 100%;
  border: 0;
  border-radius: 0.8rem;
  padding: 0.85rem;
  background: #ff6b2c;
  color: #1a100c;
  font-weight: 700;
  cursor: pointer;
}`,
    js: `document.querySelector('button').onclick = () => {
  document.querySelector('button').textContent = 'Selected ✓';
};`,
  },
  {
    id: 'theme-toggle',
    title: 'Theme Toggle',
    description: 'Switch between light and dark modes.',
    html: `<div class="page" id="page">
  <button id="toggle">Toggle theme</button>
  <h1>Readable interfaces</h1>
  <p>Click the button to flip light and dark. Try editing the colors.</p>
</div>`,
    css: `:root {
  --bg: #0d0c12;
  --fg: #f3efe8;
  --muted: #b8b0a4;
  --btn: #ff6b2c;
}
.page.light {
  --bg: #f6f1e8;
  --fg: #17141f;
  --muted: #5c564e;
  --btn: #d4531a;
}
body { margin: 0; font-family: system-ui, sans-serif; }
.page {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--bg);
  color: var(--fg);
  transition: background 0.3s ease, color 0.3s ease;
}
button {
  justify-self: start;
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  background: var(--btn);
  color: white;
  font-weight: 600;
  cursor: pointer;
}
h1 { margin: 0; font-size: 2rem; }
p { margin: 0; color: var(--muted); max-width: 28ch; line-height: 1.5; }`,
    js: `const page = document.getElementById('page');
document.getElementById('toggle').onclick = () => {
  page.classList.toggle('light');
};`,
  },
  {
    id: 'progress',
    title: 'Progress Bars',
    description: 'Animated skill meters in CSS + JS.',
    html: `<div class="panel">
  <h2>Skills</h2>
  <label>HTML <span>95%</span></label>
  <div class="track"><div class="bar" data-value="95"></div></div>
  <label>CSS <span>90%</span></label>
  <div class="track"><div class="bar" data-value="90"></div></div>
  <label>JavaScript <span>85%</span></label>
  <div class="track"><div class="bar" data-value="85"></div></div>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0b0a10;
  color: #efeae2;
  font-family: system-ui, sans-serif;
}
.panel {
  width: min(340px, 92vw);
  padding: 1.3rem;
  border-radius: 1rem;
  background: #15121c;
  border: 1px solid rgba(255,255,255,0.08);
}
h2 { margin: 0 0 1rem; }
label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin: 0.85rem 0 0.35rem;
  color: #cfc7bb;
}
.track {
  height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}
.bar {
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff6b2c, #ffb347);
  transition: width 1s ease;
}`,
    js: `requestAnimationFrame(() => {
  document.querySelectorAll('.bar').forEach((bar) => {
    bar.style.width = bar.dataset.value + '%';
  });
});`,
  },
  {
    id: 'modal',
    title: 'Modal Dialog',
    description: 'Open and close an overlay with JS.',
    html: `<button id="open">Open modal</button>
<div class="overlay" id="overlay" hidden>
  <div class="modal" role="dialog" aria-modal="true">
    <h2>Ship the detail</h2>
    <p>Modals are great for confirmations, forms, and focused content.</p>
    <button id="close">Close</button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0c0b12;
  font-family: system-ui, sans-serif;
  color: #f2ebe2;
}
button {
  border: 0;
  border-radius: 0.75rem;
  padding: 0.8rem 1.1rem;
  background: #ff6b2c;
  color: #1a100c;
  font-weight: 700;
  cursor: pointer;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: grid;
  place-items: center;
  padding: 1rem;
}
.overlay[hidden] { display: none; }
.modal {
  width: min(340px, 92vw);
  background: #17141f;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 1rem;
  padding: 1.3rem;
}
h2 { margin: 0 0 0.5rem; }
p { margin: 0 0 1rem; color: #bdb5a9; line-height: 1.5; }
#close { background: #2a2433; color: #f2ebe2; }`,
    js: `const overlay = document.getElementById('overlay');
document.getElementById('open').onclick = () => { overlay.hidden = false; };
document.getElementById('close').onclick = () => { overlay.hidden = true; };
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.hidden = true;
});`,
  },
]
