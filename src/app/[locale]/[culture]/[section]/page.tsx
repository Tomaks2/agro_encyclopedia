import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getCultureMeta, getSectionContent, getAllCultures } from "@/lib/cultures";
import { extractHeadings, estimateReadTime } from "@/lib/mdx";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReadingProgress from "@/components/culture/ReadingProgress";
import TreeAnatomyDiagram from "@/components/diagrams/TreeAnatomyDiagram";
import FruitFormationsDiagram from "@/components/diagrams/FruitFormationsDiagram";
import RootSystemDiagram from "@/components/diagrams/RootSystemDiagram";
import BudArrangementDiagram from "@/components/diagrams/BudArrangementDiagram";
import PeachAppleComparison from "@/components/diagrams/PeachAppleComparison";
import AnnualCycleDiagram from "@/components/diagrams/AnnualCycleDiagram";
import PremiumHierarchy from "@/components/diagrams/PremiumHierarchy";
import PremiumProcess from "@/components/diagrams/PremiumProcess";
import BranchAngleDiagram from "@/components/diagrams/BranchAngleDiagram";
import TreeLifespanDiagram from "@/components/diagrams/TreeLifespanDiagram";
import PremiumComparison from "@/components/diagrams/PremiumComparison";
import ChemicalsDirectory from "@/components/diagrams/ChemicalsDirectory";
import BranchAnatomyDiagram from "@/components/diagrams/BranchAnatomyDiagram";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Callout, InfoBlock } from "@/components/mdx/Callout";
import { ChapterHeader } from "@/components/mdx/ChapterHeader";
import { HeroCover } from "@/components/mdx/HeroCover";
import { PullQuote } from "@/components/mdx/PullQuote";
import { EditorialDivider } from "@/components/mdx/EditorialDivider";
import FilterTabs, { FilterTab } from "@/components/mdx/FilterTabs";
import ComparisonTable from "@/components/mdx/ComparisonTable";
import TableOfContents from "@/components/mdx/TableOfContents";
import NextChapter from "@/components/mdx/NextChapter";
import DiagnosticTool from "@/components/mdx/DiagnosticTool";
import LightboxImage from "@/components/mdx/LightboxImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Metadata } from "next";



interface Props {
  params: Promise<{ locale: string; culture: string; section: string }>;
}

function getHeadingId(children: React.ReactNode): string | undefined {
  if (typeof children !== "string") return undefined;

  return children
    .toLowerCase()
    .replace(/[^a-zа-яёіїєґ0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Custom MDX components for rendering the existing content beautifully
const getMdxComponents = (cultureSlug: string) => ({
  Callout,
  InfoBlock,
  ChapterHeader,
  HeroCover,
  PullQuote,
  EditorialDivider,
  FilterTabs,
  FilterTab,
  ComparisonTable,
  TableOfContents,
  NextChapter,
  DiagnosticTool,
  LightboxImage,
  legacyH2: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9а-яієґї]+/g, '-').replace(/(^-|-$)/g, '');
    return <h2 id={id} {...props} />;
  },
  legacyH3: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9а-яієґї]+/g, '-').replace(/(^-|-$)/g, '');
    return <h3 id={id} {...props} />;
  },
  TreeAnatomyDiagram,
  FruitFormationsDiagram,
  RootSystemDiagram,
  BudArrangementDiagram,
  PeachAppleComparison,
  AnnualCycleDiagram,
  PremiumHierarchy,
  PremiumProcess,
  BranchAngleDiagram,
  TreeLifespanDiagram,
  PremiumComparison,
  ChemicalsDirectory,
  BranchAnatomyDiagram,
  // Enhanced element rendering with cinematic reveal
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <ScrollReveal direction="up" delay={0.1} amount={0.2}><p {...props} /></ScrollReveal>
  ),
  animatedH2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = typeof props.children === "string"
      ? props.children.toLowerCase().replace(/[^a-zа-яёіїєґ0-9\s-]/gi, "").replace(/\s+/g, "-")
      : undefined;
    return <ScrollReveal direction="up" delay={0.1} amount={0.2}><h2 id={id} className="prose-h2" {...props} /></ScrollReveal>;
  },
  animatedH3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = typeof props.children === "string"
      ? props.children.toLowerCase().replace(/[^a-zа-яёіїєґ0-9\s-]/gi, "").replace(/\s+/g, "-")
      : undefined;
    return <ScrollReveal direction="left" delay={0.1} amount={0.2}><h3 id={id} className="prose-h3" {...props} /></ScrollReveal>;
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ScrollReveal direction="up" delay={0.15} amount={0.1}><ul {...props} /></ScrollReveal>
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} />
  ),
  // Enhanced image rendering
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    let src = (props.src as string) || "";
    // Rewrite "Фото/..." to "/photos/cultureSlug/..."
    if (src.startsWith("Фото/")) {
      src = `/photos/${cultureSlug}/${src.replace("Фото/", "")}`;
    }

    return (
      <ScrollReveal direction="up" duration={1.2} delay={0.1}>
        <div className="relative w-full rounded-2xl overflow-hidden my-12 group shadow-2xl border border-[var(--color-border-subtle)]">
          <Image
            src={src}
            alt={props.alt || ""}
            width={1200}
            height={800}
            className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized
          />
          {props.title && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 to-transparent p-6 pt-12">
              <p className="text-white font-serif text-lg m-0 drop-shadow-md">{props.title}</p>
            </div>
          )}
        </div>
      </ScrollReveal>
    );
  },

  // ASCII scheme pre blocks
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const content = typeof children === "object" && children !== null
      ? (children as React.ReactElement<any>)?.props?.children
      : children;
    const isText = typeof content === "string" && (content.includes("━") || content.includes("┃") || content.includes("╭") || content.includes("═"));
    if (isText) {
      return (
        <div className="ascii-scheme">
          <div className="ascii-scheme-label">📊 Схема</div>
          <pre {...props}>{children}</pre>
        </div>
      );
    }
    return <pre {...props}>{children}</pre>;
  },

  // Enhanced blockquote → callout
  blockquote: ({ children }: { children: React.ReactNode }) => {
    const text = extractBlockquoteText(children);
    let type: "tip" | "warning" | "danger" | "note" = "note";
    let icon = "💡";
    if (text?.startsWith("📌") || text?.startsWith("🌿")) { type = "tip"; icon = "📌"; }
    if (text?.startsWith("⚠️") || text?.toLowerCase().includes("небезпек")) { type = "warning"; icon = "⚠️"; }
    if (text?.toLowerCase().includes("критич") || text?.startsWith("🔴")) { type = "danger"; icon = "🚨"; }
    return (
      <div className={`callout ${type}`} role="note">
        <span className="callout-icon">{icon}</span>
        <div className="callout-content">{children}</div>
      </div>
    );
  },

  // Premium table with proper classes
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="prose-table-wrap">
      <table className="prose-table">{children}</table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="prose-thead">{children}</thead>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="prose-th">{children}</th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="prose-td">{children}</td>
  ),
  tr: ({ children }: { children: React.ReactNode }) => (
    <tr className="prose-tr">{children}</tr>
  ),

  // Section headings — centered, journal style
  legacySectionH2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = typeof children === "string"
      ? children.toLowerCase().replace(/[^a-zа-яёіїєґ0-9\s-]/gi, "").replace(/\s+/g, "-")
      : undefined;
    return <h2 id={id} className="prose-h2" {...props}>{children}</h2>;
  },

  legacySectionH3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = typeof children === "string"
      ? children.toLowerCase().replace(/[^a-zа-яёіїєґ0-9\s-]/gi, "").replace(/\s+/g, "-")
      : undefined;
    return <h3 id={id} className="prose-h3" {...props}>{children}</h3>;
  },

  legacySectionH4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="prose-h4" {...props}>{children}</h4>
  ),
  h2: ({ children, id, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id ?? getHeadingId(children)} className={["prose-h2", className].filter(Boolean).join(" ")} {...props}>{children}</h2>
  ),
  h3: ({ children, id, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id ?? getHeadingId(children)} className={["prose-h3", className].filter(Boolean).join(" ")} {...props}>{children}</h3>
  ),
  h4: ({ children, id, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 id={id ?? getHeadingId(children)} className={["prose-h4", className].filter(Boolean).join(" ")} {...props}>{children}</h4>
  ),
});

import { ActiveTOC } from "@/components/ui/ActiveTOC";

// We also need to extract blockquote text
function extractBlockquoteText(children: React.ReactNode): string | undefined {
  try {
    const str = JSON.stringify(children);
    const match = str.match(/"([^"]{3,}?)"/);
    return match ? match[1] : undefined;
  } catch {
    return undefined;
  }
}

export async function generateStaticParams() {
  const cultures = getAllCultures();
  const locales = ["uk", "en"];
  return locales.flatMap((locale) =>
    cultures.flatMap((c) =>
      c.sections.map((s) => ({ locale, culture: c.slug, section: s.slug }))
    )
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, culture: cultureSlug, section: sectionSlug } = await params;
  const culture = getCultureMeta(cultureSlug);
  if (!culture) return {};
  const section = culture.sections.find((s) => s.slug === sectionSlug);
  if (!section) return {};
  const sData = locale === "en" ? section.en : section.uk;
  const cData = locale === "en" ? culture.en : culture.uk;
  return {
    title: `${sData.title} — ${cData.name}`,
    description: sData.description,
  };
}

export default async function SectionPage({ params }: Props) {
  const { locale, culture: cultureSlug, section: sectionSlug } = await params;
  const culture = getCultureMeta(cultureSlug);
  if (!culture) notFound();

  const sectionIndex = culture.sections.findIndex((s) => s.slug === sectionSlug);
  if (sectionIndex === -1) notFound();

  const section = culture.sections[sectionIndex];
  const content = getSectionContent(cultureSlug, section.filename);
  if (!content) notFound();

  const sData = locale === "en" ? section.en : section.uk;
  const cData = locale === "en" ? culture.en : culture.uk;
  const headings = extractHeadings(content);
  const readTime = estimateReadTime(content);
  const prefix = `/${locale}`;

  const prevSection = sectionIndex > 0 ? culture.sections[sectionIndex - 1] : null;
  const nextSection = sectionIndex < culture.sections.length - 1 ? culture.sections[sectionIndex + 1] : null;

  return (
    <>
      <Header />
      <ReadingProgress />

      <div className="reading-layout">
        {/* Sidebar */}
        <aside className="reading-sidebar" aria-label="Навігація по розділах">
          {/* Back to culture */}
          <Link
            href={`${prefix}/${cultureSlug}`}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              color: "var(--color-muted)", fontSize: "0.875rem", marginBottom: "1.5rem",
              textDecoration: "none", transition: "color var(--transition-fast)"
            }}
            className="hover:text-primary"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {culture.emoji} {cData.name}
          </Link>

          {/* TOC */}
          <ActiveTOC headings={headings} />

          {/* Section list */}
          <div style={{ marginTop: "2rem" }}>
            <div className="toc-title">Всі розділи</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {culture.sections.map((s, i) => {
                const sd = locale === "en" ? s.en : s.uk;
                const isActive = s.slug === sectionSlug;
                return (
                  <Link
                    key={s.slug}
                    href={`${prefix}/${cultureSlug}/${s.slug}`}
                    style={{
                      display: "flex", gap: "0.6rem", alignItems: "flex-start",
                      padding: "0.5rem 0.6rem", borderRadius: "var(--radius-md)",
                      fontSize: "0.82rem", textDecoration: "none", lineHeight: "1.35",
                      background: isActive ? "var(--color-bg-alt)" : "transparent",
                      color: isActive ? "var(--color-primary-dark)" : "var(--color-muted)",
                      fontWeight: isActive ? "600" : "400",
                      borderLeft: isActive ? `2px solid ${culture.color}` : "2px solid transparent",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    <span style={{
                      width: "1.4rem", height: "1.4rem", background: isActive ? culture.color : "var(--color-border)",
                      color: isActive ? "white" : "var(--color-muted)", borderRadius: "4px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem", fontWeight: "700", flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    {sd.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main>
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Хлібні крихти">
            <Link href={`${prefix}/`}>Головна</Link>
            <span className="breadcrumbs-sep">/</span>
            <Link href={`${prefix}/${cultureSlug}`}>{cData.name}</Link>
            <span className="breadcrumbs-sep">/</span>
            <span>{sData.title}</span>
          </nav>

          {/* Section header (hidden if custom header exists in MDX) */}
          {!content.includes('<HeroCover') && !content.includes('<ChapterHeader') && (
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span style={{
                  background: culture.color, color: "white",
                  padding: "0.3rem 0.75rem", borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem", fontWeight: "600"
                }}>
                  Розділ {sectionIndex + 1} з {culture.sections.length}
                </span>
                <span style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>⏱ ~{readTime} хв читання</span>
              </div>
              <h1 style={{
                fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "var(--color-primary-dark)", lineHeight: "1.2", marginBottom: "0.75rem"
              }}>
                {culture.emoji} {sData.title}
              </h1>
              <p style={{ color: "var(--color-muted)", fontSize: "1.05rem" }}>{sData.description}</p>
            </div>
          )}

          {/* MDX Content */}
          <article className="prose">
            <MDXRemote
              source={content}
              components={getMdxComponents(cultureSlug) as unknown as Record<string, React.ComponentType>}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </article>

          {/* Navigation between sections */}
          <nav
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
              marginTop: "3rem", paddingTop: "2rem",
              borderTop: "1px solid var(--color-border)"
            }}
            aria-label="Навігація між розділами"
          >
            {prevSection ? (
              <Link
                href={`${prefix}/${cultureSlug}/${prevSection.slug}`}
                style={{
                  display: "block", padding: "1rem 1.25rem",
                  background: "var(--color-surface)", border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)", textDecoration: "none",
                  transition: "all var(--transition-fast)",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginBottom: "0.4rem" }}>← Попередній</div>
                <div style={{ fontWeight: "600", color: "var(--color-primary-dark)", fontSize: "0.9rem" }}>
                  {(locale === "en" ? prevSection.en : prevSection.uk).title}
                </div>
              </Link>
            ) : <div />}

            {nextSection ? (
              <Link
                href={`${prefix}/${cultureSlug}/${nextSection.slug}`}
                style={{
                  display: "block", padding: "1rem 1.25rem", textAlign: "right",
                  background: culture.colorLight, border: `1px solid ${culture.color}44`,
                  borderRadius: "var(--radius-lg)", textDecoration: "none",
                  transition: "all var(--transition-fast)",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginBottom: "0.4rem" }}>Наступний →</div>
                <div style={{ fontWeight: "600", color: "var(--color-primary-dark)", fontSize: "0.9rem" }}>
                  {(locale === "en" ? nextSection.en : nextSection.uk).title}
                </div>
              </Link>
            ) : <div />}
          </nav>
        </main>
      </div>

      <Footer />
      <ScrollToTop />
    </>
  );
}
