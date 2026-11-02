// Usage: npm run new -- "My post title"
// Creates src/content/posts/<slug>/index.md as a draft.
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "My post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/ł/g, 'l')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');
const dir = `src/content/posts/${slug}`;
if (existsSync(dir)) {
  console.error(`${dir} already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
mkdirSync(dir, { recursive: true });
writeFileSync(
  `${dir}/index.md`,
  `---
title: ${JSON.stringify(title)}
description: One or two sentences shown on the post list.
date: ${today}
tags: []
draft: true          # remove this line (or set false) to publish
# cover: ./cover.jpg
# coverAlt: Describe the image
---

Start writing here.
`,
);
console.log(`Created ${dir}/index.md  (put images for this post in the same folder)`);
