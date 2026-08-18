const file = 'd:/1/agro_encyclopedia-main/.next/server/app/uk/kavun/visiv-ta-krapelne-zroshennia.html';
const fs = require('fs');
if(fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  let match = content.match(/<ol[^>]*>[\s\S]*?<\/ol>/i);
  if(match) {
    console.log("FOUND OL:", match[0].substring(0, 500));
  } else {
    console.log("NO OL FOUND");
    // look for Нижній шар
    let match2 = content.match(/<[^>]+>[^<]*Нижній шар[^<]*<\/[^>]+>/gi);
    console.log("MATCH2:", match2);
  }
} else {
  console.log("FILE NOT FOUND");
}