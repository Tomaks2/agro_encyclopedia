import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function parseMarkdown(content: string) {
  // Pre-process: fix common issues in the MD content
  let processed = content
    // Fix unclosed code blocks (`` `text `` → ``` text ```)
    .replace(/^``text$/gm, "```text")
    .replace(/^``$/gm, "```")
    // Ensure proper line endings
    .replace(/\r\n/g, "\n");

  const mdxSource = await serialize(processed, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return mdxSource;
}

/**
 * Extract headings from markdown content for TOC
 */
export function extractHeadings(
  content: string
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-zа-яёіїєґ0-9\s-]/gi, "")
      .replace(/\s+/g, "-")
      .trim();
    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Extract a plain-text excerpt from markdown
 */
export function extractExcerpt(content: string, maxLength = 200): string {
  const stripped = content
    .replace(/^#{1,6}\s+.+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return stripped.length > maxLength
    ? stripped.slice(0, maxLength) + "…"
    : stripped;
}

/**
 * Estimate read time in minutes
 */
export function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
