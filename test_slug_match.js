const { getCultureMeta } = require('./src/lib/cultures.ts'); // Wait, cultures.ts is typescript. Let's just mock what page.tsx does.
const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('content/cultures/lokhyna/meta.json', 'utf8'));
const slugToMatch = decodeURIComponent("biolohiya-%D1%82%D0%B0-atsydofiliia");
const section = meta.sections.find(s => s.slug === slugToMatch);
console.log("Matched section:", section);