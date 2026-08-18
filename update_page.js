const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/src/app/[locale]/[culture]/[section]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update article class to be wider
content = content.replace(/<article className="prose"/g, '<article className="prose max-w-4xl mx-auto w-full"');

// Enhance MDX table components with left alignment and better padding
const newTableComponents = `    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="w-full my-8 rounded-xl border border-[#e5e7eb] shadow-sm bg-white overflow-hidden">
        <table className="w-full text-left border-collapse text-sm sm:text-base" style={{ tableLayout: 'auto', wordBreak: 'break-word' }} {...props} />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead className="bg-[#f3f4f6] border-b border-[#e5e7eb] text-[#2C3825] font-semibold text-left" {...props} />
    ),
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody className="divide-y divide-[#e5e7eb]" {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className="hover:bg-[#f6f4ee]/30 transition-colors" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th className="px-3 py-3 sm:px-5 sm:py-4 whitespace-normal text-left align-top" {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
      <td className="px-3 py-3 sm:px-5 sm:py-4 align-top text-[#4b5563] whitespace-normal text-left" {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <div className="w-full my-8 rounded-xl shadow-sm bg-neutral-900 overflow-x-auto">
        <pre className="p-4 sm:p-6 text-xs sm:text-sm text-neutral-100 whitespace-pre" {...props} />
      </div>
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code className="bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    ),`;

// Replace the previous table definitions if they exist
content = content.replace(/    table:[\s\S]*?(?=    li:)/, newTableComponents + '\n');

fs.writeFileSync(file, content, 'utf8');