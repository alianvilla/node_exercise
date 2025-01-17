const fs = require("fs");
const axios = require("axios");

function cat(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    console.log(data);
  } catch (error) {
    console.log(`Error reading ${path}:\n ${error}`);
    process.exit(1);
  }
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(`Error fetching ${url}:\n ${error}`);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node step1.js <file-path>");
  process.exit(1);
}

const input = args[0];
if (input.startsWith("http://") || input.startsWith("https://")) {
  webCat(input);
} else {
  cat(input);
}
