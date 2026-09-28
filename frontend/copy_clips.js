import fs from 'fs';
import path from 'path';

const srcDir = 'e:/ironise/frontend/clips';
const destDir = 'e:/ironise/frontend/public/clips';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  files.forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${file} -> ${destFile}`);
    }
  });
}
