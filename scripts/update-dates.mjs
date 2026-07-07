import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync(
  'git diff --cached --name-only --diff-filter=ACMR src/content/articles/*.md',
)
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

if (!files.length) process.exit(0);

const today = new Date().toISOString().split('T')[0];

for (const file of files) {
  const raw = readFileSync(file, 'utf-8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) continue;

  const status = execSync(`git status --porcelain "${file}"`)
    .toString()
    .trim()
    .charAt(0);

  const isNew = status === 'A' || status === '?';
  let fm = m[1];

  if (isNew && !fm.includes('pubDatetime:')) {
    fm = `pubDatetime: ${today}\n${fm}`;
  } else if (
    !isNew &&
    !raw.includes('// skip-date') &&
    fm.includes('pubDatetime:')
  ) {
    if (fm.includes('modDatetime:')) {
      fm = fm.replace(/modDatetime:.*/, `modDatetime: ${today}`);
    } else {
      fm = fm.replace(/(pubDatetime:.*)/, `$1\nmodDatetime: ${today}`);
    }
  }

  writeFileSync(file, raw.replace(m[1], fm));
  execSync(`git add "${file}"`);
}
