const fs = require('fs');
let content = fs.readFileSync('m:/agro_encyclopedia/src/components/layout/Header.tsx', 'utf8');

// Remove the duplicated lines
content = content.replace(`
  const [isSearching, setIsSearching] = useState(false);
  const fuseRef = useRef<Fuse<any> | null>(null);
  const t = useTranslations("search");
`, `
  const t = useTranslations("search");
`);

fs.writeFileSync('m:/agro_encyclopedia/src/components/layout/Header.tsx', content, 'utf8');
console.log('Fixed Header');
