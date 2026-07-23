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

        {/* Cultures */}
        <div>
          <div className="footer-col-title">Культури</div>
          <ul className="footer-links">
            <li><Link href={`${L}/yablunia`}>🍎 Яблуня</Link></li>
            <li><Link href={`${L}/hrusha`}>🍐 Груша</Link></li>
            <li><Link href={`${L}/persyk`}>🍑 Персик</Link></li>
            <li><Link href={`${L}/chereshnia`}>🍒 Черешня</Link></li>
            <li><Link href={`${L}/slyva`}>🫐 Слива</Link></li>
            <li><Link href={`${L}/abrykos`}>🍋 Абрикос</Link></li>
            <li><Link href={`${L}/khurma`}>🟠 Хурма</Link></li>
            <li><Link href={`${L}/vynograd`}>🍇 Виноград</Link></li>
            <li><Link href={`${L}/polunytsia`}>🍓 Полуниця</Link></li>
            <li><Link href={`${L}/malytsia`}>🍇 Малина</Link></li>
            <li><Link href={`${L}/lokhyna`}>🫐 Лохина</Link></li>
            <li><Link href={`${L}/ozhyna`}>🖤 Ожина</Link></li>
            <li><Link href={`${L}/smorodyna`}>🫐 Смородина та Порічки</Link></li>
            <li><Link href={`${L}/ahrus`}>🍒 Агрус</Link></li>
            <li><Link href={`${L}/tomat`}>🍅 Томат (Помідор)</Link></li>
            <li><Link href={`${L}/kukurudza-tsukrova`}>🌽 Кукурудза цукрова</Link></li>
            <li><Link href={`${L}/perets`}>🫑 Перець солодкий та гіркий</Link></li>
            <li><Link href={`${L}/baklazhan`}>🍆 Баклажан</Link></li>
            <li><Link href={`${L}/ohirok`}>🥒 Огірок</Link></li>
            <li><Link href={`${L}/kavun`}>🍉 Кавун</Link></li>
            <li><Link href={`${L}/dynia`}>🍈 Диня</Link></li>
            <li><Link href={`${L}/kabachok`}>🥒 Кабачок та Патисон</Link></li>
            <li><Link href={`${L}/harbuz`}>🎃 Гарбуз</Link></li>
            <li><Link href={`${L}/kartoplia`}>🥔 Картопля</Link></li>
            <li><Link href={`${L}/morkva`}>🥕 Морква столова</Link></li>
            <li><Link href={`${L}/buriak`}>🍠 Буряк столовий</Link></li>
            <li><Link href={`${L}/tsybulia`}>🧅 Цибуля ріпчаста</Link></li>
            <li><Link href={`${L}/chasnyk`}>🧄 Часник</Link></li>
            <li><Link href={`${L}/kapusta`}>🥬 Капуста білокачанна</Link></li>
            <li><Link href={`${L}/horokh`}>🫛 Горох овочевий</Link></li>
            <li><Link href={`${L}/kvasolia`}>🫘 Квасоля спаржева</Link></li>
            <li><Link href={`${L}/redys`}>🔴 Редис</Link></li>
            <li><Link href={`${L}/daikon`}>🤍 Редька та Дайкон</Link></li>
            <li><Link href={`${L}/asparahus`}>🎋 Спаржа (Аспарагус)</Link></li>
            <li><Link href={`${L}/batat`}>🍠 Батат (Солодка картопля)</Link></li>
            <li><Link href={`${L}/selera`}>🌿 Селера</Link></li>
            <li><Link href={`${L}/fyzalis`}>🥭 Фізаліс</Link></li>
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
