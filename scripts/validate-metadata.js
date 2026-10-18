/* eslint-disable @typescript-eslint/no-require-imports -- build and validation scripts use CommonJS. */
const fs = require("fs");
const path = require("path");

const culturesDir = path.join(process.cwd(), "content", "cultures");
const errors = [];
const warnings = [];
const cultureSlugs = new Set();

function reportError(message) {
  errors.push(message);
}

function reportWarning(message) {
  warnings.push(message);
}

if (!fs.existsSync(culturesDir)) {
  reportError(`Missing cultures directory: ${culturesDir}`);
} else {
  for (const directory of fs.readdirSync(culturesDir).sort()) {
    const cultureDir = path.join(culturesDir, directory);
    const metaPath = path.join(cultureDir, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    } catch (error) {
      reportError(`${directory}: invalid meta.json (${error.message})`);
      continue;
    }

    if (meta.slug !== directory) {
      reportError(`${directory}: meta.slug must equal directory name`);
    }
    if (cultureSlugs.has(meta.slug)) {
      reportError(`${directory}: duplicate culture slug ${meta.slug}`);
    }
    cultureSlugs.add(meta.slug);

    if (!Array.isArray(meta.sections)) {
      reportError(`${directory}: sections must be an array`);
      continue;
    }

    if (meta.stats?.sections !== meta.sections.length) {
      reportWarning(
        `${directory}: stats.sections=${meta.stats?.sections} but actual=${meta.sections.length}`
      );
    }

    const sectionSlugs = new Set();
    for (const [index, section] of meta.sections.entries()) {
      const label = `${directory}.sections[${index}]`;
      if (!section || typeof section !== "object") {
        reportError(`${label}: section must be an object`);
        continue;
      }

      if (!section.slug) reportError(`${label}: missing slug`);
      if (sectionSlugs.has(section.slug)) {
        reportError(`${label}: duplicate section slug ${section.slug}`);
      }
      sectionSlugs.add(section.slug);

      if (section.linkedCulture || section.linkedSection) {
        if (!section.linkedCulture || !section.linkedSection) {
          reportError(`${label}: linked sections require linkedCulture and linkedSection`);
        }
      } else if (!section.filename) {
        reportError(`${label}: missing filename`);
      } else if (!fs.existsSync(path.join(cultureDir, section.filename))) {
        reportError(`${label}: missing file ${section.filename}`);
      }

      for (const locale of ["uk", "en"]) {
        if (!section[locale]?.title) reportWarning(`${label}: missing ${locale}.title`);
        if (!section[locale]?.description) {
          reportWarning(`${label}: missing ${locale}.description`);
        }
      }
    }
  }
}

console.log(`metadata_dirs=${cultureSlugs.size}`);
console.log(`errors=${errors.length}`);
console.log(`warnings=${warnings.length}`);

if (errors.length > 0) {
  console.log("\nERRORS");
  console.log(errors.join("\n"));
}
if (warnings.length > 0) {
  console.log("\nWARNINGS");
  console.log(warnings.join("\n"));
}

process.exitCode = errors.length > 0 ? 1 : 0;
