const fs = require('fs');
const path = require('path');

function processCulture(cultureDir) {
  const files = fs.readdirSync(cultureDir).filter(f => f.endsWith('.md'));
  const usageCount = {};
  const fileImages = {};

  // Step 1: Count image usages
  files.forEach(f => {
    const fp = path.join(cultureDir, f);
    const content = fs.readFileSync(fp, 'utf8');
    const match = content.match(/<HeroCover\s+[^>]*imageSrc="([^"]+)"/);
    if (match) {
      const img = match[1];
      fileImages[f] = img;
      usageCount[img] = (usageCount[img] || 0) + 1;
    }
  });

  console.log(`--- ${cultureDir} Image Usages ---`);
  console.log(usageCount);

  // Step 2: For any image used > 1 time, remove <HeroCover ... /> from all secondary files (or all files sharing it)
  files.forEach(f => {
    const fp = path.join(cultureDir, f);
    let content = fs.readFileSync(fp, 'utf8');
    const img = fileImages[f];

    if (img && usageCount[img] > 1) {
      // Remove <HeroCover ... /> block cleanly
      const newContent = content.replace(/\n?<HeroCover[\s\S]*?\/>\n?/, '\n');
      fs.writeFileSync(fp, newContent, 'utf8');
      console.log(`✓ Removed duplicate HeroCover from ${f} (was ${img})`);
    }
  });
}

processCulture('content/cultures/slyva');
processCulture('content/cultures/chereshnia');

console.log('✓ Cleanup complete: All duplicate cover images removed!');
