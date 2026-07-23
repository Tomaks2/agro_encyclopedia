import React from "react";
import Image from "next/image";

export default function TreeAnatomyDiagram() {
  return (
    <div className="diagram-wrapper">
      <div className="diagram-header">
        <div className="diagram-badge">✨ Візуальна схема</div>
        <h3 className="diagram-title">Принципова будова дерева</h3>
      </div>

      <div className="diagram-body">
        <div className="image-container">
          <Image 
            src="/photos/yablunia/Розділ_1_Будова_яблуні.png" 
            alt="Будова дерева яблуні" 
            width={1200} 
            height={800}
            className="base-image"
            unoptimized
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .diagram-wrapper {
          margin: 3rem 0;
          font-family: var(--font-sans);
        }
        .diagram-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .diagram-badge {
          display: inline-block;
          background: rgba(132, 204, 22, 0.15);
          color: #65a30d;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .diagram-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-primary-dark);
          margin-bottom: 0.25rem;
        }
        
        .diagram-body {
          position: relative;
          width: 100%;
          margin: 0 auto;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          background: #fff;
        }
        
        .image-container {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .base-image {
          width: 100%;
          height: auto;
          display: block;
        }
      `}} />
    </div>
  );
}
