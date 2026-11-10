import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'src');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(name)) out.push(p);
  }
  return out;
}

for (const file of walk(root)) {
  let src = readFileSync(file, 'utf8');
  if (!src.includes('motion/react') || src.includes('MotionProvider')) continue;
  if (file.includes('MotionProvider')) continue;

  let next = src;

  // motion + AnimatePresence
  next = next.replace(
    /import\s+\{\s*motion\s*,\s*AnimatePresence\s*\}\s+from\s+['"]motion\/react['"]/g,
    `import * as m from 'motion/react-m';\nimport { AnimatePresence } from 'motion/react'`
  );
  // motion only
  next = next.replace(
    /import\s+\{\s*motion\s*\}\s+from\s+['"]motion\/react['"]/g,
    `import * as m from 'motion/react-m'`
  );

  // motion.xxx → m.xxx (avoid matching comments)
  next = next.replace(/\bmotion\./g, 'm.');

  if (next !== src) {
    writeFileSync(file, next);
    console.log('updated', file);
  }
}
