const fs = require('fs');
const file = 'd:/1/agro_encyclopedia-main/src/app/[locale]/[culture]/[section]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const tableComponents = `    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="w-full my-8 rounded-xl border border-[#e5e7eb] shadow-sm bg-white overflow-hidden">
        <table className="w-full text-left border-collapse text-sm sm:text-base" style={{ tableLayout: 'auto' }} {...props} />
      </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead className="bg-[#f3f4f6] border-b border-[#e5e7eb] text-[#2C3825] font-semibold" {...props} />
    ),
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <tbody className="divide-y divide-[#e5e7eb]" {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className="hover:bg-[#f6f4ee]/30 transition-colors" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
      <th className="px-4 py-3 sm:px-5 sm:py-4 whitespace-normal" {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
      <td className="px-4 py-3 sm:px-5 sm:py-4 align-top text-[#4b5563] whitespace-normal" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <li {...props} />
    ),`;

content = content.replace(/    li: \(props: React\.HTMLAttributes<HTMLLIElement>\) => \(\s*<li \{\.\.\.props\} \/>\s*\),/, tableComponents);

fs.writeFileSync(file, content, 'utf8');