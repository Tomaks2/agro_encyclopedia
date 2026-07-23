import React from 'react';

interface Props {
  headers?: string[];
  rows?: string[][];
  headersJSON?: string;
  rowsJSON?: string;
}

export default function ComparisonTable(props: Props) {
  let headers = props.headers || [];
  let rows = props.rows || [];

  if (props.headersJSON) {
    try { headers = JSON.parse(props.headersJSON); } catch (e) {}
  }
  if (props.rowsJSON) {
    try { rows = JSON.parse(props.rowsJSON); } catch (e) {}
  }

  if (!headers || !headers.map) headers = [];
  if (!rows || !rows.map) rows = [];

  return (
    <div className="premium-table-container">
      <div className="premium-table-wrapper">
        <table className="premium-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    {j === 0 ? <strong className="text-primary-dark">{cell}</strong> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .premium-table-container {
          margin: 2.5rem 0;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
        }
        .premium-table-wrapper {
          overflow-x: auto;
          width: 100%;
        }
        .premium-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body);
          text-align: left;
          min-width: 600px;
        }
        .premium-table th {
          background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
          color: white;
          font-weight: 700;
          padding: 1.2rem 1.5rem;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        .premium-table th:last-child {
          border-right: none;
        }
        .premium-table td {
          padding: 1.2rem 1.5rem;
          border-bottom: 1px solid var(--color-border-light);
          color: var(--color-text);
          font-size: 0.95rem;
          vertical-align: top;
          line-height: 1.5;
        }
        .premium-table tr:last-child td {
          border-bottom: none;
        }
        .premium-table tbody tr {
          transition: background-color 0.2s ease;
        }
        .premium-table tbody tr:hover {
          background-color: var(--color-surface-2);
        }
        .premium-table tbody tr:nth-child(even) {
          background-color: rgba(0, 0, 0, 0.02);
        }
        .text-primary-dark {
          color: var(--color-primary-dark);
          font-weight: 700;
        }
      `}} />
    </div>
  );
}