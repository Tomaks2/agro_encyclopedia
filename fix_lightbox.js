const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/src/components/mdx/LightboxImage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace maxHeight: '80vh' with something less restrictive or remove it.
// Let's change it to maxHeight: '120vh' or just remove it to let the max-w-full dictate the height.
content = content.replace("maxHeight: '80vh'", "maxHeight: 'none'");

fs.writeFileSync(file, content, 'utf8');