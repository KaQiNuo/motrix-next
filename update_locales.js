import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = "src/shared/locales";

const NEW_KEYS = {
  "external-aria2-section": "External Aria2",
  "use-external-aria2": "Use external aria2",
  "external-aria2-host": "Host",
  "external-aria2-port": "Port",
  "external-aria2-secret": "RPC Secret",
  "external-aria2-tip": "When enabled, Motrix Next will connect to an external aria2 instance instead of launching its built-in sidecar.",
};

function insertBeforeEngineSection(content, translations) {
  const lines = content.split('\n');
  let insertIdx = null;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("'engine-section'") || lines[i].includes('"engine-section"')) {
      insertIdx = i;
      break;
    }
  }

  if (insertIdx === null) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("'rpc-secret-empty-title'") || lines[i].includes('"rpc-secret-empty-title"')) {
        insertIdx = i + 1;
        break;
      }
    }
  }

  if (insertIdx === null) {
    console.log("  WARN: could not find insertion point");
    return content;
  }

  const newLines = [];
  for (const [key, value] of Object.entries(translations)) {
    const escaped = value.replace(/'/g, "\\'");
    newLines.push(`  '${key}': '${escaped}',`);
  }

  lines.splice(insertIdx, 0, "");
  for (let i = newLines.length - 1; i >= 0; i--) {
    lines.splice(insertIdx, 0, newLines[i]);
  }

  return lines.join('\n');
}

function updateLocale(filepath, translations) {
  const content = fs.readFileSync(filepath, "utf-8");

  if (content.includes("'external-aria2-section'") || content.includes('"external-aria2-section"')) {
    console.log("  SKIP: already has keys");
    return;
  }

  const newContent = insertBeforeEngineSection(content, translations);
  fs.writeFileSync(filepath, newContent, "utf-8");
  console.log("  UPDATED");
}

const locales = fs.readdirSync(LOCALES_DIR).sort();
for (const locale of locales) {
  const localeDir = path.join(LOCALES_DIR, locale);
  if (!fs.statSync(localeDir).isDirectory()) continue;
  const filepath = path.join(localeDir, "preferences.js");
  if (!fs.existsSync(filepath)) continue;
  console.log(`Processing ${locale}...`);
  updateLocale(filepath, NEW_KEYS);
}

console.log("Done!");
