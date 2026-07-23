"use client";

import React from "react";

interface ProcessStep {
  title: string;
  desc?: string;
  icon?: string;
  action?: string;
}

interface Props {
  title: string;
  steps?: ProcessStep[];
  stepsJSON?: string;
  direction?: "vertical" | "horizontal";
}

function renderInlineLinks(text: string) {
  if (typeof text !== 'string') return text;
  
  // Safe split that preserves the unmatched parts
  const parts = text.split(/(\[[^\]]+\]\([^\)]+\))/g);
  return parts.map((part, index) => {
    // Only parse if it exactly matches the markdown link syntax
    if (/^\[[^\]]+\]\([^\)]+\)$/.test(part)) {
      const match = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (match) {
        return <a key={index} href={match[2]} className="step-link" style={{ textDecoration: 'underline', color: 'var(--color-primary-dark)' }}>{match[1]}</a>;
      }
    }
    // Return normal text for non-links
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export default function PremiumProcess({ title, steps = [], stepsJSON, direction = "vertical" }: Props) {
  let parsedSteps = steps; console.log("Received stepsJSON:", stepsJSON);
  try {
    if (stepsJSON) {
      parsedSteps = JSON.parse(stepsJSON);
    }
  } catch (e: any) {
    return <div style={{color: 'red', padding: '20px'}}>Error parsing JSON in PremiumProcess: {e.message}</div>;
  }
  
  if (!parsedSteps || parsedSteps.length === 0) {
    return null;
  }
  return (
    <div className="diagram-wrapper">
      <div className="diagram-header">
        <h3 className="diagram-title">{title}</h3>
      </div>
      <div className="diagram-card">
        <div className={`process-container dir-${direction}`}>
          {parsedSteps.map((step: any, index: number) => (
            <div key={index} className="process-step">
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                {step.icon && <span className="step-icon">{step.icon}</span>}
                <div className="step-text">
                  <div className="step-title">{step.title}</div>
                  {step.desc && <div className="step-desc">{renderInlineLinks(step.desc)}</div>}
                  {step.action && <div className="step-action">→ {step.action}</div>}
                </div>
              </div>
              {/* Only render connector if it's not the last step */}
              {index < parsedSteps.length - 1 && (
                <div className="step-connector"></div>
              )}
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

        .process-container {
          display: flex;
          gap: 1.5rem;
        }
        
        .dir-vertical {
          flex-direction: column;
        }
        
        .dir-horizontal {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
        }

        .process-step {
          display: flex;
          position: relative;
          flex: 1;
        }
        
        .dir-vertical .process-step {
          flex-direction: row;
          align-items: flex-start;
          gap: 1.5rem;
        }
        
        .dir-horizontal .process-step {
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          min-width: 200px;
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
          color: white;
          font-weight: 700;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          z-index: 2;
        }

        .step-content {
          background: var(--color-surface-2);
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border-light);
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .step-content:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px -5px rgba(0,0,0,0.08);
          background: #fff;
        }

        .step-icon {
          font-size: 1.75rem;
          text-align: center;
        }

        .step-text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .dir-horizontal .step-text {
          text-align: center;
        }

        .step-title {
          font-weight: 600;
          color: var(--color-primary-dark);
          font-size: 1rem;
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .step-link {
          color: inherit;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .step-action {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-accent-dark);
          background: rgba(234, 179, 8, 0.1);
          padding: 0.5rem;
          border-radius: var(--radius-md);
          display: inline-block;
          margin-top: 0.5rem;
        }

        .step-connector {
          position: absolute;
          background: var(--color-border);
          z-index: 1;
        }
        
        .dir-vertical .step-connector {
          top: 2.5rem;
          bottom: -1.5rem;
          left: 1.2rem;
          width: 2px;
        }
        
        .dir-horizontal .step-connector {
          top: 1.25rem;
          left: 50%;
          width: 100%;
          height: 2px;
        }

        @media (max-width: 640px) {
          .dir-horizontal {
            flex-direction: column;
          }
          .dir-horizontal .process-step {
            flex-direction: row;
            align-items: flex-start;
          }
          .dir-horizontal .step-text {
            text-align: left;
          }
          .dir-horizontal .step-connector {
            top: 2.5rem;
            bottom: -1.5rem;
            left: 1.2rem;
            width: 2px;
            height: auto;
          }
        }
      `}} />
    </div>
  );
}
