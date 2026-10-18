/* eslint-disable @typescript-eslint/no-require-imports -- build and validation scripts use CommonJS. */
const fs = require("fs");
const path = require("path");

const contentDir = path.join(process.cwd(), "content", "cultures");
const publicDir = path.join(process.cwd(), "public");
const errors = [];
const warnings = [];
const cultureMetaCache = new Map();
let filesChecked = 0;
let imageReferences = 0;

function resolvePublicAsset(assetPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(assetPath);
  } catch {
    return null;
  }
  if (!decoded.startsWith("/") || decoded.startsWith("//")) return null;
  return path.join(publicDir, decoded.slice(1));
}

function collectContentFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry);
      if (!fs.statSync(entryPath).isDirectory()) return [];
      return fs
        .readdirSync(entryPath)
        .filter((filename) => /\.mdx?$/.test(filename))
        .filter((filename) => !/^(REPORT_|SOURCES_)/.test(filename))
        .filter((filename) => !/^README(?:_|\.)/i.test(filename))
        .map((filename) => path.join(entryPath, filename));
    });
}

function getCultureFallback(filePath) {
  const cultureSlug = path.relative(contentDir, filePath).split(path.sep)[0];
  if (!cultureSlug) return null;
  if (!cultureMetaCache.has(cultureSlug)) {
    const metaPath = path.join(contentDir, cultureSlug, "meta.json");
    if (!fs.existsSync(metaPath)) {
      cultureMetaCache.set(cultureSlug, null);
    } else {
      try {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
        cultureMetaCache.set(
          cultureSlug,
          meta.image || (cultureSlug === "nasinnytstvo" ? "/images/content/img_beans.jpg" : null),
        );
      } catch {
        cultureMetaCache.set(cultureSlug, null);
      }
    }
  }
  const fallback = cultureMetaCache.get(cultureSlug);
  const resolved = fallback ? resolvePublicAsset(fallback) : null;
  return resolved && fs.existsSync(resolved) ? fallback : null;
}

const files = collectContentFiles(contentDir);
const attributePattern = /\b(imageSrc|src)\s*=\s*(["'])([^"']+)\2/g;
const lightboxPattern = /<LightboxImage\b([\s\S]*?)\/>/g;

for (const filePath of files) {
  filesChecked += 1;
  const content = fs.readFileSync(filePath, "utf8");
  const relativePath = path.relative(process.cwd(), filePath);

  for (const match of content.matchAll(attributePattern)) {
    const [, attribute, , assetPath] = match;
    if (/^(https?:|data:|#)/i.test(assetPath)) continue;
    imageReferences += 1;
    const resolvedPath = resolvePublicAsset(assetPath);
    if (!resolvedPath) {
      warnings.push(`${relativePath}: non-local ${attribute}=${assetPath}`);
    } else if (!fs.existsSync(resolvedPath)) {
      if (attribute === "imageSrc") {
        const fallback = getCultureFallback(filePath);
        if (fallback) {
          warnings.push(`${relativePath}: HeroCover fallback resolves missing asset ${assetPath} to ${fallback}`);
        } else {
          errors.push(`${relativePath}: missing HeroCover asset ${assetPath} and no valid culture fallback`);
        }
      } else {
        errors.push(`${relativePath}: missing asset ${assetPath}`);
      }
    }
  }

  for (const match of content.matchAll(lightboxPattern)) {
    if (!/\balt\s*=\s*["'][^"']+[^"']*["']/.test(match[1])) {
      warnings.push(`${relativePath}: LightboxImage is missing alt text`);
    }
  }
}

console.log(`content_files_checked=${filesChecked}`);
console.log(`image_references=${imageReferences}`);
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
