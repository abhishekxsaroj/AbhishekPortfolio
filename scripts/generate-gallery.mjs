import fs from 'node:fs'

const source = fs.readFileSync(
  'C:/Users/VINDHYA/OneDrive/Desktop/creativeportfolio/src/data/posts.js',
  'utf8',
)

const start = source.indexOf('export const posts = ')
const end = source.indexOf('\nexport const CATEGORY_OPTIONS')
const arrayLiteral = source
  .slice(start + 'export const posts = '.length, end)
  .trim()
  .replace(/;$/, '')

const posts = JSON.parse(arrayLiteral)

function mapFilter(post) {
  if (post.type === 'video' || post.category === 'Reels') return 'Videos'
  if (post.category === 'Logos') return 'Branding'
  const tools = (post.tools || []).join(' ').toLowerCase()
  if (tools.includes('illustrator')) return 'Graphics'
  if (post.category === 'Social Media Posts') return 'Social Media'
  return 'Graphics'
}

const items = posts.map((post) => ({
  id: post.id,
  type: post.type === 'video' ? 'video' : 'image',
  src: post.media,
  filter: mapFilter(post),
  client: post.client || '',
  aspect: post.format || '4:5',
  width: post.width || 1080,
  height: post.height || 1350,
}))

const counts = items.reduce((acc, item) => {
  acc[item.filter] = (acc[item.filter] || 0) + 1
  return acc
}, {})

fs.writeFileSync(
  new URL('../src/data/gallery.json', import.meta.url),
  `${JSON.stringify(items, null, 2)}\n`,
)

console.log('items', items.length, counts)
