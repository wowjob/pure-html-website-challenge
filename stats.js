const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");

const folderPath = process.argv[2];

if (!folderPath) {
  console.log("Please provide folder path as an argument.");
  process.exit(1);
}

const tagsCount = {};

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(`Error reading directory: ${err}`);
    return;
  }

  const htmlFiles = files.filter((file) => path.extname(file) === ".html");

  htmlFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const htmlContent = fs.readFileSync(filePath, "utf-8");
    const root = parse(htmlContent);

    root.querySelectorAll("*").forEach((node) => {
      const tagName = node.tagName.toLowerCase();
      tagsCount[tagName] = (tagsCount[tagName] || 0) + 1;
    });
  });

  const uniqueTagsCount = Object.keys(tagsCount).length;

  console.log(`Number of total unique HTML tags used: ${uniqueTagsCount}`);
  console.log("Tags count:");
  console.log(tagsCount);
});
