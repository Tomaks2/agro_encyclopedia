import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const L = `/${locale}`;

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div>
          <div className="footer-brand-name">
            <span>🌱</span>
            АгроЕнциклопедія
          </div>
          <p className="footer-brand-desc">{t("about")}</p>
        </div>

        {/* Navigation */}
        <div>
          <div className="footer-col-title">Розділи</div>
          <ul className="footer-links">
            <li><Link href={L}>{tNav("home")}</Link></li>
            <li><Link href={`${L}/diagnostics`}>{tNav("diagnostics")}</Link></li>
            <li><Link href={`${L}/calendar`}>{tNav("calendar")}</Link></li>
            <li><Link href={`${L}/search`}>{tNav("search")}</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© {currentYear} {t("copyright")}. Всі права захищені.</span>
        <span style={{ opacity: 0.5 }}>Зроблено для садівників України 🇺🇦</span>
      </div>
    </footer>
  );
}
