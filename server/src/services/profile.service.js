import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'data', 'profile.json');

// tiny in-memory cache
let cache = null;
export function getProfileData() {
  if (!cache) {
    const json = fs.readFileSync(dataPath, 'utf-8');
    cache = JSON.parse(json);
  }
  return cache;
}
