import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseDir = path.join(root, 'web-build');

const htmlFiles = ['index.html', 'contact.html', 'gallery.html'];

for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = content.replace(
      /<script(.*?)><\/script>/gs,
      (match) => `${match}\n<script>\n  (function(){\n    const route = window.location.pathname.replace(/\\/$/, '');\n    const repoBase = '/hamza-saleh-farms-main';\n    const map = {\n      '/': '/index.html',\n      '/contact': '/contact.html',\n      '/gallery': '/gallery.html'\n    };\n    const target = map[route] || map[route + '/'] || null;\n    if (!target && route && route.startsWith(repoBase)) {\n      const short = route.slice(repoBase.length) || '/';\n      const shortTarget = map[short] || map[short + '/'];\n      if (shortTarget) {\n        window.location.replace(repoBase + shortTarget);\n      }\n    } else if (target) {\n      const current = window.location.pathname;\n      if (current !== repoBase + target) {\n        window.location.replace(repoBase + target);\n      }\n    }\n  })();\n</script>`
    );
    fs.writeFileSync(filePath, updated);
  }
}

const rootIndex = path.join(baseDir, 'index.html');
if (fs.existsSync(rootIndex)) {
  fs.copyFileSync(rootIndex, path.join(baseDir, '404.html'));
}

console.log('GitHub Pages SPA redirect setup complete.');
