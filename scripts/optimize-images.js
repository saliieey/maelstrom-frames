const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/hero');
const QUALITY = 85; // Reduced from 90 for better compression
const RESIZE_WIDTH = 1920; // Max width for web

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  const files = fs.readdirSync(IMAGES_DIR).filter(f => {
    return f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png');
  });

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const stat = fs.statSync(filePath);
    const sizeBefore = stat.size / 1024; // KB

    try {
      const metadata = await sharp(filePath).metadata();
      
      // Resize to max 1920px width and compress
      await sharp(filePath)
        .resize(RESIZE_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'cover'
        })
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(filePath + '.tmp');

      // Replace original with optimized
      fs.renameSync(filePath + '.tmp', filePath);
      
      const statAfter = fs.statSync(filePath);
      const sizeAfter = statAfter.size / 1024; // KB
      const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   Before: ${sizeBefore.toFixed(1)} KB | After: ${sizeAfter.toFixed(1)} KB | Reduced: ${reduction}%\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
}

optimizeImages().catch(console.error);
