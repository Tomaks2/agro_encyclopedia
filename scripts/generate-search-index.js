const fs = require("fs");
const path = require("path");

const CULTURES_DIR = path.join(__dirname, "..", "content", "cultures");
const OUTPUT_FILE = path.join(__dirname, "..", "public", "search-index.json");

function getAllCultures() {
  if (!fs.existsSync(CULTURES_DIR)) return [];
  const dirs = fs.readdirSync(CULTURES_DIR).filter((d) => {
    const metaPath = path.join(CULTURES_DIR, d, "meta.json");
    return fs.existsSync(metaPath);
  });
  return dirs.map((slug) => {
    const metaPath = path.join(CULTURES_DIR, slug, "meta.json");
    return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  });
}

function getSectionContent(cultureSlug, filename) {
  const filePath = path.join(CULTURES_DIR, cultureSlug, filename);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

function generateSearchIndex() {
  console.log("Generating search index...");
  const cultures = getAllCultures();
  const searchDocs = [];

  for (const culture of cultures) {
    if (!culture.sections) continue;
    
    for (const section of culture.sections) {
      const content = getSectionContent(culture.slug, section.filename) || "";
      // Strip MDX/JSX components and markdown for clean search text
      const cleanContent = content
        // Remove YAML frontmatter
        .replace(/^---[\s\S]*?---\n?/, "")
        // Remove self-closing JSX/MDX components: <HeroCover .../>, <Callout/>
        .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, " ")
        // Remove paired JSX/MDX components: <Callout>...</Callout>
        .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, " ")
        // Remove remaining HTML/JSX tags
        .replace(/<[^>]+>/g, " ")
        // Remove markdown images
        .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
        // Convert links to text only
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        // Remove table rows
        .replace(/^\|.*\|$/gm, "")
        // Remove markdown formatting characters
        .replace(/[#*`_~>\\]/g, " ")
        // Remove list markers
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        // Collapse whitespace
        .replace(/\s+/g, " ")
        .trim();

      searchDocs.push({
        id: `${culture.slug}-${section.slug}`,
        cultureSlug: culture.slug,
        sectionSlug: section.slug,
        cultureNameUk: culture.uk.name,
        cultureNameEn: culture.en.name,
        sectionTitleUk: section.uk.title,
        sectionTitleEn: section.en.title,
        content: cleanContent,
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchDocs), "utf-8");
  console.log(`Search index generated successfully with ${searchDocs.length} entries.`);
}

generateSearchIndex();
