/* eslint-disable @typescript-eslint/no-require-imports -- report script runs directly in Node. */
const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "content", "cultures", "nasinnytstvo");
const output = path.join(process.cwd(), "reports", "SEED_COVERAGE_MATRIX.md");
const topics = [
  ["Біологія / вид", /біолог|ботаніч|вид\b|родин|запил/i],
  ["Сорт / OP / F1", /сорт|OP\b|F1|F2|гібрид/i],
  ["Запилення / ізоляція", /запилен|ізоляц|пилок|маточник/i],
  ["Стиглість / збір", /стигл|дозрів|збір|збирати/i],
  ["Очищення / вилучення", /очищ|вилуч|ферментац|промив|обмолот/i],
  ["Сушіння", /сушін|сушити|висуш/i],
  ["Схожість / тест", /схож|проростан|тест.*насін|контрольн.*проростан/i],
  ["Зберігання / етикетка", /зберіган|етикет|маркуван|парті|простеж/i],
  ["Ризики / санітарія", /хвороб|інфекц|фітосан|ризик|безпек|протру/i],
  ["Джерела", /##+\s*джерел|джерел|extension|university|FAO|UPOV/i],
];

function readMeta() {
  return JSON.parse(fs.readFileSync(path.join(root, "meta.json"), "utf8"));
}

function main() {
  const meta = readMeta();
  const rows = [];
  for (const section of meta.sections || []) {
    if (!section.filename) {
      rows.push({ number: section.number || "13", title: section.uk.title, file: "bridge", words: 0, marks: topics.map(() => "→") });
      continue;
    }
    const file = path.join(root, section.filename);
    const content = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
    rows.push({
      number: section.number || section.filename.match(/^\d+/)?.[0] || "—",
      title: section.uk.title,
      file: section.filename,
      words: content.split(/\s+/).filter(Boolean).length,
      marks: topics.map(([, pattern]) => pattern.test(content) ? "✓" : "—"),
    });
  }
  const header = topics.map(([label]) => label);
  const lines = [
    "# Coverage matrix — насінництво й селекція",
    "",
    `Згенеровано: ${new Date().toISOString().slice(0, 10)}. Локальних Markdown-глав: ${rows.filter((row) => row.file !== "bridge").length}; bridge-секцій: ${rows.filter((row) => row.file === "bridge").length}.`,
    "",
    "> Ця матриця є редакційним інструментом, а не доказом повноти. Позначка `✓` означає лише наявність відповідних термінів у тексті; кожна глава все одно потребує фахової перевірки причин, протоколів, обмежень і джерел.",
    "",
    `| № | Глава | Слів | ${header.join(" | ")} |`,
    `| :--- | :--- | ---: | ${header.map(() => ":---:").join(" | ")} |`,
  ];
  for (const row of rows) {
    lines.push(`| ${row.number} | ${row.title} | ${row.words} | ${row.marks.join(" | ")} |`);
  }
  lines.push(
    "",
    "## Як читати матрицю",
    "",
    "Культура-специфічні глави мають доповнювати загальні глави 01–10, а не механічно повторювати їх. Найцінніші наступні редакційні покращення — замінювати повтори видовими відмінностями, додавати джерельно підтверджені параметри та явно зазначати, коли тема не застосовується до конкретної культури.",
    "",
    "Bridge до кукурудзи зберігає canonical content у каталозі `kukurudza-tsukrova`; він навмисно не дублюється в цій матриці.",
    "",
  );
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${lines.join("\n")}\n`, "utf8");
  console.log(`seed_coverage_report=${path.relative(process.cwd(), output)}`);
  console.log(`seed_sections=${rows.length}`);
}

main();
