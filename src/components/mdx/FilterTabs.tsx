'use client';
import React, { useState, useRef, useEffect } from 'react';

export function FilterTab({ children }: { children: React.ReactNode }) {
  return <div className="filter-tab-content">{children}</div>;
}

export default function FilterTabs({ tabs = [], children }: { tabs?: string[] | string, children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  let parsedTabs: string[] = [];
  if (Array.isArray(tabs)) {
    parsedTabs = tabs;
  } else if (typeof tabs === 'string') {
    if (tabs.includes(',') || !tabs.startsWith('[')) {
      parsedTabs = tabs.split(',').map(t => t.trim());
    } else {
      try { parsedTabs = JSON.parse(tabs); } catch(e) { parsedTabs = []; }
    }
  }

  let contentBlocks = React.Children.toArray(children).filter((child) => {
    if (typeof child === 'string' && child.trim() === '') return false;
    return true;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    // Use a specific class we add in the map below, not the one from FilterTab component
    const contentDivs = Array.from(containerRef.current.querySelectorAll('.filter-section-target'));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = contentDivs.indexOf(entry.target as Element);
          if (index !== -1) setActiveTab(index);
        }
      });
    }, { rootMargin: '-150px 0px -40% 0px', threshold: 0 });

    contentDivs.forEach(div => observer.observe(div));
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    
    // Find the corresponding child DOM element by index
    if (containerRef.current) {
      const contentDivs = containerRef.current.querySelectorAll('.filter-section-target');
      if (contentDivs[index]) {
        const y = contentDivs[index].getBoundingClientRect().top + window.scrollY - 140; // offset for the sticky header
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="filter-tabs-wrapper" ref={containerRef}>
      <div className="filter-tabs-header">
        <div className="filter-tabs-list">
          <span className="filter-tabs-label">Швидкий перехід:</span>
          {parsedTabs?.map((tab: string, i: number) => (
            <button 
              key={i} 
              onClick={() => handleTabChange(i)} 
              className={`filter-tab-button ${activeTab === i ? 'filter-tab-button-active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="filter-tabs-content-all">
        {contentBlocks.map((block, i) => (
          <div key={i} className="filter-section-target mb-16">
            {block}
          </div>
        ))}
      </div>
    </div>
  );
}
