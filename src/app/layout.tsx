import { ThemeProvider } from "@/components/layout/ThemeProvider";

import type { Viewport } from "next";

export const metadata = {
  title: "АгроЕнциклопедія",
  description: "Повний довідник садівника України",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2C3825",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming!
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
