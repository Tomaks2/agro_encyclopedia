const fs = require('fs');

async function check() {
  const { compile } = await import('@mdx-js/mdx');
  const remarkGfm = (await import('remark-gfm')).default;

  const content = fs.readFileSync('content/cultures/slyva/01-biolohiya.md', 'utf8');
  console.log('--- Content length:', content.length);
  
  try {
    const res = await compile(content, { remarkPlugins: [remarkGfm] });
    console.log('MDX compile success!');
  } catch(e) {
    console.error('MDX compile error:', e);
  }
}

check();
