/* eslint-disable @typescript-eslint/no-require-imports -- build and validation scripts use CommonJS. */
const fs = require("fs");
const path = require("path");

const contentDir = path.join(process.cwd(), "content", "cultures");
const forbiddenComponents = ["ComparisonTable", "PremiumProcess"];
const errors = [];
let filesChecked = 0;

if (fs.existsSync(contentDir)) {
  for (const directory of fs.readdirSync(contentDir)) {
    const directoryPath = path.join(contentDir, directory);
    if (!fs.statSync(directoryPath).isDirectory()) continue;

    for (const filename of fs.readdirSync(directoryPath)) {
      if (!/\.mdx?$/.test(filename)) continue;
      if (/^(REPORT_|SOURCES_|README)/i.test(filename)) continue;

      const filePath = path.join(directoryPath, filename);
      const content = fs.readFileSync(filePath, "utf8");
      filesChecked += 1;

      for (const component of forbiddenComponents) {
        const pattern = new RegExp(`<${component}\\b`);
        if (pattern.test(content)) {
          errors.push(`${path.relative(process.cwd(), filePath)}: forbidden <${component}>`);
        }
      }
    }
  }
} else {
  errors.push(`Missing content directory: ${contentDir}`);
}

console.log(`content_files_checked=${filesChecked}`);
console.log(`forbidden_component_errors=${errors.length}`);
if (errors.length > 0) {
  console.log("\nERRORS");
  console.log(errors.join("\n"));
}

process.exitCode = errors.length > 0 ? 1 : 0;
