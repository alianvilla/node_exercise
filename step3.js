const fs = require("fs");
const axios = require("axios");

function writeToFile(filename, content) {
  try {
    fs.writeFileSync(filename, content, "utf8");
  } catch (err) {
    console.error(`Couldn't write ${filename}:\n  ${err}`);
    process.exit(1);
  }
}

function cat(path, outFilename) {
  try {
    const data = fs.readFileSync(path, "utf8");
    if (outFilename) {
      writeToFile(outFilename, data);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error(`Error reading ${path}:\n  ${err}`);
    process.exit(1);
  }
}

async function webCat(url, outFilename) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (outFilename) {
      writeToFile(outFilename, data);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node step3.js [--out output-filename] <file-path|url>");
  process.exit(1);
}

let outFilename = null;
let input = null;

if (args[0] === "--out") {
  if (args.length < 3) {
    console.error(
      "Usage: node step3.js [--out output-filename] <file-path|url>"
    );
    process.exit(1);
  }
  outFilename = args[1];
  input = args[2];
} else {
  input = args[0];
}

if (input.startsWith("http://") || input.startsWith("https://")) {
  webCat(input, outFilename);
} else {
  cat(input, outFilename);
}
