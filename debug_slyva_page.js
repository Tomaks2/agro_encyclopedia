const fs = require('fs');
const path = require('path');

async function testMDXRemote() {
  const { compile } = await import('@mdx-js/mdx');
  const remarkGfm = (await import('remark-gfm')).default;

  const slyvaMetaPath = 'content/cultures/slyva/meta.json';
  if (!fs.existsSync(slyvaMetaPath)) {
    console.error('❌ meta.json missing!');
    return;
  }

  const rawMeta = fs.readFileSync(slyvaMetaPath, 'utf8');
  let meta;
  try {
    meta = JSON.parse(rawMeta);
    console.log('✓ meta.json is valid JSON');
  } catch(e) {
    console.error('❌ Invalid JSON in meta.json:', e.message);
    return;
  }

  for (const s of meta.sections) {
    const fp = path.join('content/cultures/slyva', s.filename);
    if (!fs.existsSync(fp)) {
      console.error(`❌ File ${s.filename} does not exist!`);
      continue;
    }
    const content = fs.readFileSync(fp, 'utf8');
    try {
      await compile(content, { remarkPlugins: [remarkGfm] });
      console.log(`✓ ${s.filename} (${s.slug}) MDX OK`);
    } catch(e) {
      console.error(`❌ MDX Error in ${s.filename}:`, e.message);
    }
  }
}

testMDXRemote();
