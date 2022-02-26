const fs = require("fs");

const content = fs.readFileSync(process.cwd() + "/words.txt", "utf-8");
const lines = content.split("\r\n");
const words = lines
  .map((line) => {
    const [word, _def] = line.split(";");
    const trimmed = word.replace(/[0-9\/\s/.]+/g, "");
    if (trimmed.length === 5 && trimmed.search("-") === -1) {
      return trimmed;
    }
  })
  .filter((x) => x);

fs.writeFileSync(process.cwd() + "/public/words.json", JSON.stringify(words));
