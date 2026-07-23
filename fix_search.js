const fs = require('fs');
let css = fs.readFileSync('m:/agro_encyclopedia/src/app/globals.css', 'utf8');

const oldSearchBtn = `.search-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-bg-warm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-muted);
  transition: all var(--transition-fast);
  min-width: 200px;
}

.search-btn:hover {
  background: var(--color-surface);
  border-color: var(--color-primary-light);
  color: var(--color-text);
}`;

const newSearchBtn = `.search-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.25rem;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid transparent;
  border-radius: 99px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  min-width: 220px;
}

.search-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.1);
  color: var(--color-text);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}`;

if (css.includes('.search-btn {')) {
  // Find the block
  const start = css.indexOf('.search-btn {');
  const end = css.indexOf('.search-btn-text {');
  
  if (start !== -1 && end !== -1) {
    const before = css.substring(0, start);
    const after = css.substring(end);
    css = before + newSearchBtn + '\n\n' + after;
    fs.writeFileSync('m:/agro_encyclopedia/src/app/globals.css', css, 'utf8');
    console.log('Fixed search-btn css');
  }
}
