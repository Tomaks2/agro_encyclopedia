import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  localePrefix: "always", // always /uk/... and /en/...
  localeDetection: false, // Do not auto-redirect based on browser language
});
