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
      // Strip markdown formatting for cleaner search
      const cleanContent = content
        .replace(/[#*`_]/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\n+/g, " ");

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
