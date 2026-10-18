import { getAllCultures } from "@/lib/cultures";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CulturesCatalog from "@/components/ui/CulturesCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог культур — АгроЕнциклопедія",
  description: "Повний перелік довідників з вирощування плодових дерев, ягід та овочів.",
  alternates: { canonical: "/uk/catalog" },
};

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const requestedCategory = Array.isArray(query.category) ? query.category[0] : query.category;
  
  const cultures = getAllCultures();
  const order = ['yablunia', 'hrusha', 'persyk'];
  cultures.sort((a, b) => {
    const aIndex = order.indexOf(a.slug);
    const bIndex = order.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <CulturesCatalog cultures={cultures} locale={locale} initialCategory={requestedCategory ?? null} />
      </main>
      <Footer />
    </>
  );
}
