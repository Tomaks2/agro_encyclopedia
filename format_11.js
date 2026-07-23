const fs = require('fs');

function mdTableToJson(mdTable) {
  const lines = mdTable.trim().split('\n');
  if (lines.length < 3) return null;
  
  const extractCells = (line) => line.split('|').slice(1, -1).map(c => c.trim().replace(/"/g, '&quot;'));
  
  const headers = extractCells(lines[0]);
  const rows = [];
  
  for (let i = 2; i < lines.length; i++) {
    const row = extractCells(lines[i]);
    if (row.length === headers.length) {
      rows.push(row);
    }
  }
  
  return {
    headersJSON: JSON.stringify(headers).replace(/"/g, '&quot;'),
    rowsJSON: JSON.stringify(rows).replace(/"/g, '&quot;')
  };
}

let content = fs.readFileSync('m:\\agro_encyclopedia\\content\\cultures\\yablunia\\11-rehiony.md', 'utf-8');

// Replace Chapter 10 with 11
content = content.replace(/chapter="РОЗДІЛ 10"/g, 'chapter="РОЗДІЛ 11"');
content = content.replace(/10\.1\./g, '11.1.');
content = content.replace(/10\.2\./g, '11.2.');
content = content.replace(/10\.3\./g, '11.3.');
content = content.replace(/10\.4\./g, '11.4.');
content = content.replace(/10\.5\./g, '11.5.');

// Find and replace all tables
const tableRegex = /((?:\|.*\|\n)+)/g;
content = content.replace(tableRegex, (match) => {
  // Check if it's a valid table (has a separator row)
  if (match.includes('|---|') || match.includes('|--- |')) {
    const tableData = mdTableToJson(match);
    if (tableData) {
      return `<ComparisonTable \n  headersJSON="${tableData.headersJSON}"\n  rowsJSON="${tableData.rowsJSON}"\n/>\n`;
    }
  }
  return match;
});

// Fix Schema 35 list to Callout
content = content.replace(/СХЕМА 35: САДІВНИЧІ ЗОНИ УКРАЇНИ ТА РЕКОМЕНДОВАНІ СОРТИ\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n([\s\S]*?)(?=\n\nПолісся)/, (match, list) => {
  return `<Callout type="info" title="СХЕМА 35: САДІВНИЧІ ЗОНИ УКРАЇНИ">\n\n${list.trim()}\n\n</Callout>`;
});

fs.writeFileSync('m:\\agro_encyclopedia\\content\\cultures\\yablunia\\11-rehiony.md', content, 'utf-8');
console.log('Successfully formatted 11-rehiony.md');
