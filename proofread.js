const fs = require('fs');
const path = require('path');

const dir = 'm:/agro_encyclopedia/content/cultures';

const replacements = [
  // Typography
  [/(?<!^)(?<!^\s+) - /gm, ' — '], // hyphens to em-dashes (not for lists)
  [/ ,/g, ','], // remove space before comma
  [/ \./g, '.'], // remove space before dot
  [/,([а-яА-ЯіІїЇєЄґҐ])/g, ', $1'], // add space after comma if missing before letter

  // Grammar & Surzhyk
  [/(?<!з'|з’|з)являється/g, 'є'],
  [/(?<!З'|З’|З)Являється/g, 'Є'],
  [/(?<!з'|з’|з)являються/g, 'є'],
  [/(?<!З'|З’|З)Являються/g, 'Є'],
  
  [/\bприймати участь\b/g, 'брати участь'],
  [/\bприймає участь\b/g, 'бере участь'],
  [/\bприймають участь\b/g, 'беруть участь'],
  
  [/\bна протязі\b/g, 'протягом'],
  [/\bНа протязі\b/g, 'Протягом'],
  
  [/\bв кінці кінців\b/g, 'зрештою'],
  [/\bВ кінці кінців\b/g, 'Зрештою'],
  
  [/\bзаключається в\b/g, 'полягає в'],
  [/\bЗаключається в\b/g, 'Полягає в'],
  
  [/\bспівпадає\b/g, 'збігається'],
  [/\bспівпадають\b/g, 'збігаються'],
  [/\bспівпадати\b/g, 'збігатися'],
  
  [/\bприводить до\b/g, 'призводить до'],
  [/\bприводять до\b/g, 'призводять до'],
  
  [/\bслідуючий\b/g, 'наступний'],
  [/\bСлідуючий\b/g, 'Наступний'],
  [/\bслідуючого\b/g, 'наступного'],
  [/\bслідуючому\b/g, 'наступному'],
  [/\bслідуюча\b/g, 'наступна'],
  [/\bслідуючу\b/g, 'наступну'],
  [/\bслідуючі\b/g, 'наступні'],
  [/\bСлідуючі\b/g, 'Наступні'],
  
  [/\bне дивлячись на\b/g, 'незважаючи на'],
  [/\bНе дивлячись на\b/g, 'Незважаючи на'],
  
  [/\bсамий кращий\b/g, 'найкращий'],
  [/\bсама краща\b/g, 'найкраща'],
  [/\bсамі кращі\b/g, 'найкращі'],
  [/\bСамий кращий\b/g, 'Найкращий'],
  
  [/\bудобрення\b/g, 'підживлення'],
  [/\bУдобрення\b/g, 'Підживлення'],
];

let totalFixed = 0;

function walk(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const p = path.join(directory, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.md') || p.endsWith('.json')) {
      let original = fs.readFileSync(p, 'utf8');
      let content = original;
      
      for (const [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== original) {
        fs.writeFileSync(p, content, 'utf8');
        console.log('Fixed:', p.replace(dir, ''));
        totalFixed++;
      }
    }
  }
}

walk(dir);
console.log('Total files fixed:', totalFixed);
