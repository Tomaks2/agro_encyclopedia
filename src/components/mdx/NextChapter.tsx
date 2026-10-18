import React from 'react';
import Link from 'next/link';
import { buildLocaleAwareHref } from '@/lib/cultures';

export default function NextChapter({
  href,
  title,
  chapterNum,
  locale = 'uk',
}: {
  href: string;
  title: string;
  chapterNum: string;
  locale?: string;
}) {
  const resolvedHref = buildLocaleAwareHref(href, locale);

  return (
    <div className="next-chapter-container">
      <Link href={resolvedHref} className="next-chapter-link">
        <div className="next-chapter-card">
          <div>
            <span className="next-chapter-label">
              Наступний крок ➔ {chapterNum}
            </span>
            <h3 className="next-chapter-title">
              {title}
            </h3>
          </div>
          <div className="next-chapter-arrow">
            →
          </div>
        </div>
      </Link>
    </div>
  );
}
