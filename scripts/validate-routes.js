/* eslint-disable @typescript-eslint/no-require-imports -- build and validation scripts use CommonJS. */
const fs = require("fs");
const path = require("path");

const culturesDir = path.join(process.cwd(), "content", "cultures");
const errors = [];
const routeSet = new Set(["/uk", "/uk/catalog", "/uk/calendar"]);
const sectionByCulture = new Map();

function addError(message) {
  errors.push(message);
}

if (!fs.existsSync(culturesDir)) {
  addError(`Missing cultures directory: ${culturesDir}`);
} else {
  for (const directory of fs.readdirSync(culturesDir).sort()) {
    const cultureDir = path.join(culturesDir, directory);
    const metaPath = path.join(cultureDir, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    } catch (error) {
      addError(`${directory}: invalid meta.json (${error.message})`);
      continue;
    }

    const sectionSlugs = new Set();
    sectionByCulture.set(directory, sectionSlugs);
    routeSet.add(`/uk/${directory}`);

    for (const section of Array.isArray(meta.sections) ? meta.sections : []) {
      if (!section?.slug) continue;
      sectionSlugs.add(section.slug);
      if (section.linkedCulture && section.linkedSection) {
        routeSet.add(`/uk/${section.linkedCulture}/${section.linkedSection}`);
      } else {
        routeSet.add(`/uk/${directory}/${section.slug}`);
      }
    }
  }
}

const contentFiles = fs.existsSync(culturesDir)
  ? fs
      .readdirSync(culturesDir)
      .flatMap((directory) => {
        const cultureDir = path.join(culturesDir, directory);
        if (!fs.existsSync(cultureDir)) return [];
        return fs
          .readdirSync(cultureDir)
          .filter((filename) => /\.mdx?$/.test(filename))
          .filter((filename) => !/^(REPORT_|SOURCES_)/.test(filename))
          .filter((filename) => !/^README(?:_|\.)/i.test(filename))
          .map((filename) => path.join(cultureDir, filename));
      })
  : [];

const nextChapterPattern = /<NextChapter\b[\s\S]*?\/>/g;
const hrefPattern = /\bhref\s*=\s*["']([^"']+)["']/;

for (const filePath of contentFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const relativePath = path.relative(process.cwd(), filePath);

  for (const component of content.matchAll(nextChapterPattern)) {
    const hrefMatch = component[0].match(hrefPattern);
    if (!hrefMatch) {
      addError(`${relativePath}: NextChapter is missing href`);
      continue;
    }

    let href;
    try {
      href = decodeURIComponent(hrefMatch[1]);
    } catch {
      addError(`${relativePath}: invalid encoded href ${hrefMatch[1]}`);
      continue;
    }

    if (!href.startsWith("/uk/") || !routeSet.has(href)) {
      addError(`${relativePath}: NextChapter points to missing route ${href}`);
    }
  }
}

console.log(`canonical_routes=${routeSet.size}`);
console.log(`content_files_checked=${contentFiles.length}`);
console.log(`errors=${errors.length}`);

if (errors.length > 0) {
  console.log("\nERRORS");
  console.log(errors.join("\n"));
}

process.exitCode = errors.length > 0 ? 1 : 0;
