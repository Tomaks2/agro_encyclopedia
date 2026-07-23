import React from "react";
import Image from "next/image";

export default function FruitFormationsDiagram() {
  return (
    <div className="diagram-wrapper">
      <div className="diagram-header">
        <div className="diagram-badge">✨ Візуальна схема</div>
        <h3 className="diagram-title">Плодові утворення яблуні</h3>
      </div>

      <div className="diagram-body">
        <div className="image-container">
          <Image 
            src="/photos/yablunia/Розділ_1_Типи_бруньок.png" 
            alt="Плодові утворення яблуні" 
            width={1200} 
            height={800}
            className="base-image"
            unoptimized
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        /* Спадкуємо стилі від TreeAnatomyDiagram (глобальні для сторінки) */
      `}} />
    </div>
  );
}
