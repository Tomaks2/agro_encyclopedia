import { NextResponse } from "next/server";
import { getAllCultures, getSectionContent } from "@/lib/cultures";

export const dynamic = "force-static"; // Ensure this is statically generated at build time

export async function GET() {
  const cultures = getAllCultures();
  const searchDocs: Array<{
    id: string;
    cultureSlug: string;
    sectionSlug: string;
    cultureNameUk: string;
    cultureNameEn: string;
    sectionTitleUk: string;
    sectionTitleEn: string;
    content: string;
  }> = [];

  for (const culture of cultures) {
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

  return NextResponse.json(searchDocs);
}
