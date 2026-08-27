import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseDir = path.join(root, 'web-build');

const rootIndex = path.join(baseDir, 'index.html');
if (fs.existsSync(rootIndex)) {
  fs.copyFileSync(rootIndex, path.join(baseDir, '404.html'));
}

console.log('Static export ready for Netlify root hosting.');
