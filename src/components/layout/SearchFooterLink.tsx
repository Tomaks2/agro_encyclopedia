"use client";

import { useTranslations } from "next-intl";

export default function SearchFooterLink() {
  const tNav = useTranslations("nav");

  return (
    <button
      type="button"
      className="footer-search-link"
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
    >
      {tNav("search")}
    </button>
  );
}
