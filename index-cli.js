const fs = require("fs");
const puppeteer = require("puppeteer");

async function savePDF(url) {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({ format: "A4" });
  await browser.close();
  return pdf;
}

const args = process.argv.slice(2);
if (args.length === 2) {
  console.log("Processing...");
  savePDF(args[0]).then((pdf) => {
    fs.writeFile(args[1], pdf, null, () => {
      console.log("Done!");
    });
  });
} else {
  console.error("Usage: node index-cli.js [url] [filename.pdf]");
}
