/* eslint-disable @next/next/no-page-custom-font -- external font stylesheet is intentionally loaded at the locale document level. */
/* eslint-disable @next/next/no-css-tags -- print stylesheet must be available as a document-level media stylesheet. */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    template: "%s | АгроЕнциклопедія",
    default: "АгроЕнциклопедія — Повний довідник садівника України",
  },
  description:
    "Практичні знання про вирощування плодових дерев, ягід та овочів. Від посадки до врожаю — все що потрібно знати садівнику.",
  keywords: ["садівництво", "яблуня", "груша", "обрізка", "щеплення", "хвороби рослин", "агрономія"],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "АгроЕнциклопедія",
    title: "АгроЕнциклопедія — Повний довідник садівника України",
    description:
      "Практичні знання про вирощування плодових дерев, ягід та овочів. Від посадки до врожаю — все що потрібно знати садівнику.",
  },
  twitter: {
    card: "summary_large_image",
    title: "АгроЕнциклопедія — Повний довідник садівника України",
    description:
      "Практичні знання про вирощування плодових дерев, ягід та овочів.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3d2b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { ContentProtection } from "@/components/layout/ContentProtection";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "uk") notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/print.css" media="print" />
      </head>
      <body>
        <ContentProtection />
        <a className="skip-link" href="#main-content">
          Перейти до основного вмісту
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
