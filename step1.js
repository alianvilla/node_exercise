const fs = require("fs");

function cat(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(data);
  } catch (error) {
    console.log(`Error reading ${path}:\n ${error}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node step1.js <file-path>");
  process.exit(1);
}

cat(args[0]);
