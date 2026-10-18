/* eslint-disable @typescript-eslint/no-require-imports -- validation script runs directly in Node. */
const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "content", "cultures");
const topics = {
  biology: /біолог|фізіолог|анатом|життєв|ботаніч/i,
  varieties: /сорт|гібрид|класифікац|підвид/i,
  planting: /посад|ґрунт|грунт|ділянк|сівб/i,
  nutrition: /живлен|удобр|фертиг|пожив|компост/i,
  watering: /полив|зрош|водн|волог/i,
  pruning: /обріз|формув|крон|прищип|підв'яз/i,
  diseases: /хвороб|фунгіц|гниль|мілдью|борошнист|бактері/i,
  pests: /шкідник|інсект|попелиц|кліщ|плодожер|нематод/i,
  harvest: /збір|збира|зберіг|охолод|урож|дозрів/i,
  propagation: /розмнож|щепл|живц|саджан|підщеп|відвод/i,
  calendar: /календар|сезон|регіон|замороз|зим|вегетац/i,
};

const candidates = [];
const gapCounts = Object.fromEntries(Object.keys(topics).map((topic) => [topic, 0]));

for (const directory of fs.readdirSync(root).sort()) {
  if (["references", "advanced", "epibudynok", "bdzhilnytstvo"].includes(directory)) continue;
  const cultureDir = path.join(root, directory);
  const metaPath = path.join(cultureDir, "meta.json");
  if (!fs.existsSync(metaPath)) continue;

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  if (meta.kind && meta.kind !== "culture") continue;

  const content = (meta.sections || [])
    .filter((section) => section.filename)
    .map((section) => {
      const filePath = path.join(cultureDir, section.filename);
      return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
    })
    .join("\n");

  const missing = Object.entries(topics)
    .filter(([, pattern]) => !pattern.test(content))
    .map(([topic]) => topic);

  if (missing.length >= 4) {
    candidates.push({ culture: directory, sections: meta.sections?.length || 0, missing });
    for (const topic of missing) gapCounts[topic] += 1;
  }
}

console.log(`coverage_candidates=${candidates.length}`);
console.log(`topic_gap_counts=${JSON.stringify(gapCounts)}`);
for (const candidate of candidates) {
  console.log(`${candidate.culture}\tsections=${candidate.sections}\tmissing=${candidate.missing.join(",")}`);
}
console.log("Coverage audit is advisory only; it does not fail CI because topic applicability is editorial.");
