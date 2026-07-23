import React from 'react';
import Link from 'next/link';

export default function NextChapter({ href, title, chapterNum }: { href: string, title: string, chapterNum: string }) {
  return (
    <div className="next-chapter-container">
      <Link href={href} className="next-chapter-link">
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