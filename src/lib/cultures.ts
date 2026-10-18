import fs from "fs";
import path from "path";

const CULTURES_DIR = path.join(process.cwd(), "content", "cultures");

export interface CultureSection {
  slug: string;
  filename?: string;
  order?: number;
  chapterNumber?: number;
  isPublished?: boolean;
  number?: string | number;
  linkedCulture?: string;
  linkedSection?: string;
  uk: { title: string; description: string };
  en: { title: string; description: string };
}

/** Return the editorial chapter number encoded in the filename. */
export function getSectionNumber(section: CultureSection, index: number): string {
  if (section.chapterNumber !== undefined) return String(section.chapterNumber).padStart(2, "0");
  if (section.number !== undefined) return String(section.number).padStart(2, "0");
  const match = section.filename?.match(/^(\d+)/);
  const number = match ? Number(match[1]) : index + 1;
  return String(number).padStart(2, "0");
}

export function getSectionHref(
  locale: string,
  cultureSlug: string,
  section: CultureSection
): string {
  const linkedCulture = section.linkedCulture ?? cultureSlug;
  return `/${locale}/${linkedCulture}/${section.linkedSection ?? section.slug}`;
}

export interface CultureMeta {
  slug: string;
  kind?: "culture" | "seed-production" | "apiary" | "reference" | "special";
  category?: string;
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

/** Resolve canonical slugs and legacy filename-like values against metadata. */
export function resolveSectionSlug(
  cultureSlug: string,
  rawSectionSlug: string
): string | null {
  const culture = getCultureMeta(cultureSlug);
  if (!culture) return null;

  const normalized = decodeURIComponent(rawSectionSlug).replace(/\.md$/, "");
  const section = culture.sections.find((candidate) => {
    const filenameSlug = candidate.filename?.replace(/\.md$/, "");
    return candidate.slug === normalized || filenameSlug === normalized;
  });

  return section?.slug ?? null;
}

/** Convert legacy hard-coded content links to the current locale and slug. */
export function buildLocaleAwareHref(href: string, locale: string): string {
  if (!href || href.startsWith("#") || /^(https?:|mailto:|tel:)/i.test(href)) {
    return href;
  }

  const match = href.match(/^([^?#]*)([?#].*)?$/);
  const pathPart = match?.[1] ?? href;
  const suffix = match?.[2] ?? "";
  const segments = pathPart.split("/").filter(Boolean);
  const locales = new Set(["uk", "en"]);
  const withoutLocale = locales.has(segments[0]) ? segments.slice(1) : segments;

  if (withoutLocale.length >= 2) {
    const [cultureSlug, rawSectionSlug, ...rest] = withoutLocale;
    const sectionSlug = resolveSectionSlug(cultureSlug, rawSectionSlug);
    if (sectionSlug) {
      const trailing = rest.length ? `/${rest.join("/")}` : "";
      return `/${locale}/${cultureSlug}/${sectionSlug}${trailing}${suffix}`;
    }
  }

  return href;
}
