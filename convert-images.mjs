import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import path from 'path';

const imagesDir = './images';

// 各画像の最大幅（表示サイズに合わせたリサイズ）
const sizeMap = {
  'hero.png':       1500,  // ファーストビュー
  'interior-1.png':  900,  // 大きめのグリッド
  'interior-2.png':  700,
  'interior-3.png':  700,
  'interior-4.png':  700,
  'gallery-1.png':   700,
  'gallery-2.png':   700,
  'gallery-3.png':   700,
  'gallery-4.png':   700,
  'gallery-5.png':   700,
  'gallery-6.png':   700,
};

const files = await readdir(imagesDir);
const pngFiles = files.filter(f => f.endsWith('.png'));

for (const file of pngFiles) {
  const inputPath = path.join(imagesDir, file);
  const outputName = file.replace('.png', '.webp');
  const outputPath = path.join(imagesDir, outputName);
  const maxWidth = sizeMap[file] ?? 800;

  const before = (await stat(inputPath)).size;

  await sharp(inputPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);

  const after = (await stat(outputPath)).size;
  const ratio = ((1 - after / before) * 100).toFixed(1);
  console.log(`${file} → ${outputName}  ${(before/1024/1024).toFixed(2)}MB → ${(after/1024/1024).toFixed(2)}MB  (${ratio}% 削減)`);
}

console.log('\n変換完了！');
