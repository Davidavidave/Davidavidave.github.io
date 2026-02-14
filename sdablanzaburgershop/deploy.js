
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const targetDir = path.join(__dirname, 'sdablanzaburgershop');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}



console.log('Copying dist files to sdablanzaburgershop folder...');
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir);
fs.readdirSync(distDir).forEach(item => {
  const srcPath = path.join(distDir, item);
  const destPath = path.join(targetDir, item);
  copyRecursiveSync(srcPath, destPath);
});
console.log('Files copied successfully');

console.log('Committing and pushing to main...');
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Build: Deploy React app to sdablanzaburgershop"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('Successfully deployed to main branch');
  console.log('Now go to GitHub repo settings > Pages and set source to main branch / root folder');
} catch (e) {
  console.error('⚠️  Git commit or push failed. You may have no changes or need to resolve conflicts.');
}
