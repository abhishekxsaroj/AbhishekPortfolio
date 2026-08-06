import fs from 'node:fs'

const stream = `BT
/F1 18 Tf
72 720 Td
(Abhishek Saroj) Tj
0 -28 Td
/F1 11 Tf
(Creative Developer) Tj
0 -24 Td
(Dubai) Tj
0 -36 Td
(hello@abhisheksaroj.com) Tj
0 -18 Td
(linkedin.com/in/abhisheksaroj) Tj
0 -36 Td
(Experience) Tj
0 -20 Td
(PCRED Venture  |  Website Development  |  Creative Content) Tj
0 -16 Td
(Dubai  |  Operations  |  Always Learning) Tj
0 -28 Td
(Skills) Tj
0 -20 Td
(React, JavaScript, HTML, CSS, Tailwind, Firebase,) Tj
0 -16 Td
(WordPress, WooCommerce, Vite, Photoshop, Canva,) Tj
0 -16 Td
(Video Editing, SEO, Graphic Design) Tj
ET`

const len = Buffer.byteLength(stream, 'utf8')
const objects = [
  '1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n',
  '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n',
  '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n',
  `4 0 obj<< /Length ${len} >>stream\n${stream}\nendstream\nendobj\n`,
  '5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n',
]

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (const obj of objects) {
  offsets.push(Buffer.byteLength(pdf, 'utf8'))
  pdf += obj
}

const xrefStart = Buffer.byteLength(pdf, 'utf8')
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

const out = new URL('../public/Abhishek-Saroj-Resume.pdf', import.meta.url)
fs.writeFileSync(out, pdf)
console.log('wrote', out.pathname, fs.statSync(out).size)
