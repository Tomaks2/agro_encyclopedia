import fs from "fs";
import path from "path";

const CULTURES_DIR = path.join(process.cwd(), "content", "cultures");

export interface CultureSection {
  slug: string;
  filename: string;
  uk: { title: string; description: string };
  en: { title: string; description: string };
}

export interface CultureMeta {
  slug: string;
  emoji: string;
  image?: string; // e.g. "/images/cultures/yablunia.jpg"
  color: string;
  colorLight: string;
  uk: { name: string; latinName: string; tagline: string; description: string };
  en: { name: string; latinName: string; tagline: string; description: string };
  sections: CultureSection[];
  stats: { sections: number; readTimeMinutes: number };
}

export function getAllCultures(): CultureMeta[] {
  if (!fs.existsSync(CULTURES_DIR)) return [];
  const dirs = fs.readdirSync(CULTURES_DIR).filter((d) => {
    const metaPath = path.join(CULTURES_DIR, d, "meta.json");
    return fs.existsSync(metaPath);
  });
  return dirs.map((slug) => getCultureMeta(slug)).filter(Boolean) as CultureMeta[];
}

export function getCultureMeta(slug: string): CultureMeta | null {
  const metaPath = path.join(CULTURES_DIR, slug, "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  const raw = fs.readFileSync(metaPath, "utf-8");
  return JSON.parse(raw) as CultureMeta;
}

export function getCultureSection(
  cultureSlug: string,
  sectionSlug: string
): CultureSection | null {
  const meta = getCultureMeta(cultureSlug);
  if (!meta) return null;
  return meta.sections.find((s) => s.slug === sectionSlug) ?? null;
}

export function getSectionFilePath(
  cultureSlug: string,
  filename: string
): string {
  return path.join(CULTURES_DIR, cultureSlug, filename);
}

export function getSectionContent(
  cultureSlug: string,
  filename: string
): string | null {
  const filePath = getSectionFilePath(cultureSlug, filename);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}
