import React from "react";

interface Props {
  title: string;
  leftTitle?: string;
  rightTitle?: string;
  leftJSON?: string;
  rightJSON?: string;
  headers?: string[];
  rowsJSON?: string;
  item1Title?: string;
  item1Icon?: string;
  item2Title?: string;
  item2Icon?: string;
  paramsJSON?: string;
}

function PremiumStyles() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      .pc-wrapper { margin: 3rem auto; width: 100%; max-width: 900px; display: flex; flex-direction: column; align-items: center; font-family: var(--font-body); }
      .pc-header { width: 100%; text-align: center; margin-bottom: 1.5rem; }
      .pc-title { font-size: 1.1rem; font-weight: 700; color: var(--color-primary-dark); text-transform: uppercase; letter-spacing: 0.1em; margin: 0; position: relative; display: inline-block; padding-bottom: 0.5rem; }
      .pc-title::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 3rem; height: 2px; background: var(--color-accent); border-radius: 2px; }
      .pc-card { width: 100%; background: var(--color-surface); border-radius: var(--radius-xl); box-shadow: 0 15px 35px -10px rgba(0,0,0,0.07); border: 1px solid var(--color-border-light); overflow: hidden; }
      .pc-overflow { overflow-x: auto; }
      .pc-two-col-grid { display: grid; grid-template-columns: 1fr 1fr; }
      .pc-col-header { padding: 1.25rem 1.5rem; font-weight: 700; color: var(--color-primary-dark); background: var(--color-surface-2); border-bottom: 2px solid var(--color-border); font-size: 0.9rem; }
      .pc-col-right-header { border-left: 1px solid var(--color-border-light); }
      .pc-cell { padding: 0.9rem 1.5rem; font-size: 0.88rem; color: var(--color-text); line-height: 1.5; border-bottom: 1px solid var(--color-border-subtle, #f0f0f0); vertical-align: top; }
      .pc-cell-alt { border-left: 1px solid var(--color-border-light); }
      .pc-cell-shaded { background: #fafafa; }
      .pc-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
      .pc-th { padding: 1rem 1.25rem; text-align: left; font-weight: 700; color: var(--color-primary-dark); background: var(--color-surface-2); border-bottom: 2px solid var(--color-border); }
      .pc-td { padding: 0.85rem 1.25rem; color: var(--color-text); border-bottom: 1px solid var(--color-border-subtle, #f0f0f0); vertical-align: top; line-height: 1.5; }
      .pc-row-even { background: #fafafa; }
      .pc-row-odd { background: #ffffff; }
      @media (max-width: 640px) {
        .pc-two-col-grid { grid-template-columns: 1fr; }
        .pc-col-right-header, .pc-cell-alt { border-left: none; border-top: 1px solid var(--color-border-light); }
        .pc-th, .pc-td { padding: 0.6rem 0.75rem; font-size: 0.8rem; }
      }
    `}} />
  );
}

export default function PremiumComparison(props: Props) {
  const { title } = props;

  if (props.headers && props.rowsJSON) {
    let rows: string[][] = [];
    try { rows = JSON.parse(props.rowsJSON); } catch (e: any) { return <div style={{color:"red",padding:"1rem"}}>rowsJSON error: {e.message}</div>; }
    return (
      <div className="pc-wrapper">
        <div className="pc-header"><h3 className="pc-title">{title}</h3></div>
        <div className="pc-card pc-overflow">
          <table className="pc-table">
            <thead><tr>{props.headers.map((h, i) => <th key={i} className="pc-th">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "pc-row-even" : "pc-row-odd"}>
                  {row.map((cell, ci) => <td key={ci} className="pc-td">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PremiumStyles />
      </div>
    );
  }

  if (props.leftJSON && props.rightJSON) {
    let left: string[] = [];
    let right: string[] = [];
    try { left = JSON.parse(props.leftJSON); } catch (e: any) { return <div style={{color:"red",padding:"1rem"}}>leftJSON error: {e.message}</div>; }
    try { right = JSON.parse(props.rightJSON); } catch (e: any) { return <div style={{color:"red",padding:"1rem"}}>rightJSON error: {e.message}</div>; }
    const maxLen = Math.max(left.length, right.length);
    return (
      <div className="pc-wrapper">
        <div className="pc-header"><h3 className="pc-title">{title}</h3></div>
        <div className="pc-card pc-two-col-grid">
          <div className="pc-col-header">{props.leftTitle || "Варіант А"}</div>
          <div className="pc-col-header pc-col-right-header">{props.rightTitle || "Варіант Б"}</div>
          {Array.from({ length: maxLen }).map((_, i) => (
            <React.Fragment key={i}>
              <div className={`pc-cell${i % 2 === 1 ? " pc-cell-shaded" : ""}`}>{left[i] || ""}</div>
              <div className={`pc-cell pc-cell-alt${i % 2 === 1 ? " pc-cell-shaded" : ""}`}>{right[i] || ""}</div>
            </React.Fragment>
          ))}
        </div>
        <PremiumStyles />
      </div>
    );
  }

  if (props.paramsJSON) {
    let params: {label: string; item1Value: string; item2Value: string}[] = [];
    try { params = JSON.parse(props.paramsJSON); } catch (e: any) { return <div style={{color:"red",padding:"1rem"}}>paramsJSON error: {e.message}</div>; }
    return (
      <div className="pc-wrapper">
        <div className="pc-header"><h3 className="pc-title">{title}</h3></div>
        <div className="pc-card" style={{display:"grid", gridTemplateColumns:"1.3fr 1fr 1fr"}}>
          <div style={{padding:"1rem", background:"var(--color-surface-2)", borderBottom:"2px solid var(--color-border)"}}></div>
          <div style={{padding:"1rem", fontWeight:"700", color:"var(--color-primary-dark)", background:"var(--color-surface-2)", borderBottom:"2px solid var(--color-border)", textAlign:"center"}}>{props.item1Icon} {props.item1Title}</div>
          <div style={{padding:"1rem", fontWeight:"700", color:"var(--color-primary-dark)", background:"var(--color-surface-2)", borderBottom:"2px solid var(--color-border)", textAlign:"center"}}>{props.item2Icon} {props.item2Title}</div>
          {params.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{padding:"0.9rem 1rem", fontWeight:"600", fontSize:"0.85rem", borderBottom:"1px solid #f0f0f0", background: i%2===1?"#fafafa":"#fff"}}>{p.label}</div>
              <div style={{padding:"0.9rem 1rem", textAlign:"center", fontSize:"0.875rem", borderBottom:"1px solid #f0f0f0", background: i%2===1?"#fafafa":"#fff"}}>{p.item1Value}</div>
              <div style={{padding:"0.9rem 1rem", textAlign:"center", fontSize:"0.875rem", borderBottom:"1px solid #f0f0f0", background: i%2===1?"#fafafa":"#fff"}}>{p.item2Value}</div>
            </React.Fragment>
          ))}
        </div>
        <PremiumStyles />
      </div>
    );
  }

  return null; // No data provided
}
