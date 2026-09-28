import fs from 'fs';
import path from 'path';

const searchDirs = [
  'e:/ironise',
  'C:/Users/Hi Sir!!/Downloads',
  'C:/Users/Hi Sir!!/Desktop',
  'C:/Users/Hi Sir!!/Videos'
];

function searchFiles(dir) {
  try {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (!item.startsWith('.') && item !== 'node_modules' && item !== 'AppData') {
            searchFiles(fullPath);
          }
        } else if (/\.(mp4|webm|mov|mkv|gif)$/i.test(item)) {
          console.log('FOUND_VIDEO:', fullPath);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

searchDirs.forEach(searchFiles);
