#!/usr/bin/env node
/**
 * Minden minőségellenőrző vizsgálat egy menetben.
 *
 *   node tools/qa/run.mjs          — mind
 *   node tools/qa/run.mjs layout   — csak egy
 *
 * Nem nulla kilépési kóddal zár, ha bármelyik vizsgálat hibát talált, így
 * folyamatos integrációba is beköthető.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ALL = ['layout', 'contrast', 'i18n', 'meta', 'perf'];
const pick = process.argv.slice(2).filter(a => ALL.includes(a));
const run = pick.length ? pick : ALL;

const results = [];
for (const name of run) {
  console.log(`\n\x1b[1m\x1b[36m━━ ${name} ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m`);
  const code = await new Promise(res => {
    const p = spawn(process.execPath, [path.join(HERE, `${name}.mjs`)], { stdio: 'inherit' });
    p.on('close', res);
  });
  results.push([name, code]);
}

console.log('\n\x1b[1m━━ összegzés ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
for (const [name, code] of results)
  console.log(`  ${code === 0 ? '\x1b[32m ok \x1b[0m' : '\x1b[31mHIBA\x1b[0m'}  ${name}`);
const failed = results.filter(([, c]) => c !== 0);
if (failed.length) { console.log(`\n\x1b[31m${failed.length} vizsgálat hibát talált.\x1b[0m\n`); process.exit(1); }
console.log('\n\x1b[32mMinden vizsgálat rendben.\x1b[0m\n');
