import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // English content is intentionally hidden until a complete translation is ready.
  locales: ["uk"],
  defaultLocale: "uk",
  localePrefix: "always",
  localeDetection: false, // Do not auto-redirect based on browser language
});
