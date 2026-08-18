const fs = require('fs');
const path = require('path');
const contentDir = 'd:/1/agro_encyclopedia-main/content/cultures';

let modifiedFiles = 0;

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            
            // Check if there is a LightboxImage that appears AFTER a NextChapter
            // A simple way is to match NextChapter and any LightboxImages that follow it.
            // But we might have multiple LightboxImages. 
            // It's safer to extract all LightboxImages that are at the very bottom,
            // and move them to right before ## Джерела or <NextChapter>.
            
            const lines = content.split('\n');
            let nextChapterIdx = -1;
            let dzerelaIdx = -1;
            const lightboxLines = [];
            
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('<NextChapter')) nextChapterIdx = i;
                if (lines[i].includes('## Джерела')) dzerelaIdx = i;
            }
            
            const insertIdx = (dzerelaIdx !== -1) ? dzerelaIdx : nextChapterIdx;
            
            if (insertIdx !== -1) {
                // Check if any LightboxImages are below the insertIdx
                let changed = false;
                for (let i = insertIdx + 1; i < lines.length; i++) {
                    if (lines[i].includes('<LightboxImage')) {
                        // Extract it
                        const imgLine = lines[i];
                        lines[i] = ''; // blank it out
                        // Insert it right before insertIdx
                        lines.splice(insertIdx, 0, '\n' + imgLine + '\n');
                        changed = true;
                        // we need to break because we modified the array and indexes shifted
                        // but actually let's just do it cleanly via regex
                        break;
                    }
                }
            }
        }
    }
}

// Actually, doing it via Regex string manipulation is easier and safer
function walkRegex(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walkRegex(full);
        else if (full.endsWith('.md')) {
            let content = fs.readFileSync(full, 'utf8');
            
            // If the file ends with a LightboxImage (after NextChapter)
            // Example match: <NextChapter ... /> \n\n <LightboxImage ... />
            const regex = /(<NextChapter[\s\S]*?\/>)\s*(<LightboxImage[\s\S]*?\/>)\s*$/;
            
            if (regex.test(content)) {
                content = content.replace(regex, '$2\n\n$1\n');
                fs.writeFileSync(full, content, 'utf8');
                modifiedFiles++;
                console.log(`Fixed order in: ${path.basename(full)}`);
            } else {
                // What if ## Джерела is before NextChapter and we want to move LightboxImage above ## Джерела?
                // Let's just catch anything where LightboxImage is trailing at the end of the file AFTER NextChapter
                const regex2 = /(## Джерела[\s\S]*?<NextChapter[\s\S]*?\/>)\s*(<LightboxImage[\s\S]*?\/>)\s*$/;
                if (regex2.test(content)) {
                    content = content.replace(regex2, '$2\n\n$1\n');
                    fs.writeFileSync(full, content, 'utf8');
                    modifiedFiles++;
                    console.log(`Fixed order (Dzerela) in: ${path.basename(full)}`);
                }
            }
        }
    }
}
walkRegex(contentDir);
console.log(`Fixed placement in ${modifiedFiles} files.`);