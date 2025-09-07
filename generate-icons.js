import fs from 'fs';
import path from 'path';

const dtsPath = path.resolve(
  './node_modules/@material-symbols/font-400/index.d.ts'
);
const dtsContent = fs.readFileSync(dtsPath, 'utf-8');
console.log('path is: ', dtsContent)

// Match array values inside: declare const MaterialSymbols: ["home", "search", ...];
const arrayRegex =  /type\s+MaterialSymbols\s*=\s*\[\s*([\s\S]*?)\s*\];/;
const match = arrayRegex.exec(dtsContent);

if (!match) {
  throw new Error('Could not find MaterialSymbols array in index.d.ts');
}

const rawList = match[1]
  .split(',')
  .map(str => str.trim().replace(/^"|"$/g, '')) // remove quotes
  .filter(Boolean);

const toEnumKey = (name) => {
  const safe = name.replace(/-/g, '_').toUpperCase();
  return /^\d/.test(safe) ? `ICON_${safe}` : safe;
};

const enumLines = rawList
  .sort()
  .map(name => `  ${toEnumKey(name)} = '${name}',`);

const output = `export enum MaterialSymbol {\n${enumLines.join('\n')}\n}`;

fs.writeFileSync('src/app/core/common/enum/material-symbols.ts', output);
console.log('✅ Enum generated with', rawList.length, 'icons!');
