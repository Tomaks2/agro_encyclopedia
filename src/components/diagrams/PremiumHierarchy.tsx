"use client";

import React from "react";

interface HierarchyItem {
  label: string;
  desc?: string;
  icon?: string;
  level?: number;
}

interface Props {
  title: string;
  items?: HierarchyItem[];
  itemsJSON?: string;
}

export default function PremiumHierarchy({ title, items = [], itemsJSON }: Props) {
  let parsedItems = items;
  try {
    if (itemsJSON) {
      parsedItems = JSON.parse(itemsJSON);
    }
  } catch (e: any) {
    return <div style={{color: 'red', padding: '20px'}}>Error parsing JSON in PremiumHierarchy: {e.message}<br/>{itemsJSON}</div>;
  }
  return (
    <div className="diagram-wrapper">
      <div className="diagram-header">
        <h3 className="diagram-title">{title}</h3>
      </div>
      <div className="diagram-card">
        <div className="hierarchy-container">
          {parsedItems.map((item: any, index: number) => (
            <div key={index} className={`hierarchy-item level-${item.level || 1}`}>
              <div className="connection-line"></div>
              <div className="item-content">
                {item.icon && <span className="item-icon">{item.icon}</span>}
                <div className="item-text">
                  <div className="item-label">{item.label}</div>
                  {item.desc && <div className="item-desc">{item.desc}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .diagram-wrapper {
          margin: 4rem auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font-body);
        }
        
        .diagram-header, .diagram-card {
          width: 100%;
          max-width: 800px;
        }
        
        .diagram-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .diagram-title {
          font-family: var(--font-body);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0;
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;
        }
        
        .diagram-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 3rem;
          height: 2px;
          background: var(--color-accent);
          border-radius: 2px;
        }

        .diagram-card {
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          box-shadow: 0 15px 35px -10px rgba(0,0,0,0.06);
          border: 1px solid var(--color-border-light);
          padding: 3rem 2rem;
        }

        .hierarchy-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        .hierarchy-item {
          display: flex;
          position: relative;
          align-items: stretch;
        }

        .level-1 { margin-left: 0; }
        .level-2 { margin-left: 3rem; }
        .level-3 { margin-left: 6rem; }
        .level-4 { margin-left: 9rem; }

        .item-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: var(--color-surface-2);
          padding: 1rem 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border-light);
          width: 100%;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .item-content:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          background: #fff;
        }

        .item-icon {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: var(--color-surface);
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          flex-shrink: 0;
        }

        .item-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .item-label {
          font-weight: 600;
          color: var(--color-primary-dark);
          font-size: 0.95rem;
        }

        .item-desc {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 640px) {
          .level-2 { margin-left: 1rem; }
          .level-3 { margin-left: 2rem; }
          .level-4 { margin-left: 3rem; }
          .item-content { padding: 0.75rem 1rem; gap: 0.75rem; }
          .item-icon { width: 2.5rem; height: 2.5rem; font-size: 1.25rem; }
        }
      `}} />
    </div>
  );
}
