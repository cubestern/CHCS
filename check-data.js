// CHCS data integrity check
// Usage: node check-data.js
// Reports duplicate IDs, gaps in sequential numbering, and missing required fields.
// Exits non-zero when issues are found.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATASETS = [
  {
    file: 'data/meals.js',
    global: 'MEALS',
    prefix: 'meal',
    required: ['id', 'name', 'cuisine', 'effort', 'prepTime', 'dietary', 'description', 'ingredients'],
  },
  {
    file: 'data/movies.js',
    global: 'MOVIES',
    prefix: 'movie',
    required: ['id', 'title', 'year', 'genre', 'mood', 'runtime', 'pitch', 'streaming'],
  },
  {
    file: 'data/travel.js',
    global: 'TRAVEL',
    prefix: 'travel',
    required: ['id', 'name', 'country', 'continent', 'mood', 'type', 'budget', 'duration', 'best_season', 'pitch'],
  },
  {
    file: 'data/playlists.js',
    global: 'PLAYLISTS',
    prefix: 'playlist',
    required: ['id', 'name', 'curator', 'mood', 'vibe', 'tags', 'spotifyUrl', 'trackCount', 'featured'],
  },
  {
    file: 'data/books.js',
    global: 'BOOKS',
    prefix: 'book',
    required: ['id', 'title', 'author', 'year', 'mood', 'pages', 'pitch'],
  },
];

function loadDataset({ file, global }) {
  let code = fs.readFileSync(path.join(__dirname, file), 'utf8');
  // `const X` in vm.runInContext does not attach to the context object; rewrite to `var X`.
  code = code.replace(new RegExp(`\\bconst\\s+${global}\\b`), `var ${global}`);
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return ctx[global];
}

function checkDataset(ds, items) {
  const issues = [];
  const seenIds = new Map();
  const numbers = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item === undefined || item === null) {
      issues.push(`  - sparse/empty entry at index ${i}`);
      continue;
    }

    for (const field of ds.required) {
      const v = item[field];
      const empty = v === undefined || v === null || v === '' ||
                    (Array.isArray(v) && v.length === 0);
      if (empty) {
        issues.push(`  - missing "${field}" on ${item.id || `index ${i}`}`);
      }
    }

    if (item.id) {
      if (seenIds.has(item.id)) {
        issues.push(`  - duplicate id "${item.id}" (also at index ${seenIds.get(item.id)})`);
      } else {
        seenIds.set(item.id, i);
      }

      const match = item.id.match(new RegExp(`^${ds.prefix}-(\\d+)$`));
      if (!match) {
        issues.push(`  - id "${item.id}" does not match pattern ${ds.prefix}-NNN`);
      } else {
        numbers.push(parseInt(match[1], 10));
      }
    }
  }

  numbers.sort((a, b) => a - b);
  const gaps = [];
  for (let i = 1; i < numbers.length; i++) {
    const prev = numbers[i - 1];
    const cur = numbers[i];
    if (cur - prev > 1) {
      gaps.push(`${prev + 1}–${cur - 1}`);
    }
  }
  if (gaps.length) {
    issues.push(`  - numbering gaps: ${gaps.join(', ')}`);
  }

  return { count: items.length, range: numbers.length ? `${numbers[0]}–${numbers[numbers.length - 1]}` : 'n/a', issues };
}

let totalIssues = 0;
for (const ds of DATASETS) {
  const items = loadDataset(ds);
  const result = checkDataset(ds, items);
  const status = result.issues.length === 0 ? 'OK' : `${result.issues.length} issue(s)`;
  console.log(`${ds.global.padEnd(10)} ${String(result.count).padStart(4)} items  range ${result.range.padEnd(9)} ${status}`);
  if (result.issues.length) {
    console.log(result.issues.join('\n'));
    totalIssues += result.issues.length;
  }
}

if (totalIssues > 0) {
  console.log(`\n${totalIssues} issue(s) found.`);
  process.exit(1);
} else {
  console.log('\nAll data files clean.');
}
