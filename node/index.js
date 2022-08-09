const fs = require("fs");
const puppeteer = require("puppeteer");

async function savePDF() {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto("http://localhost/", {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();
  return pdf;
}

console.log("Processing...");
savePDF().then((pdf) => {
  fs.writeFile("test.pdf", pdf, null, () => {
    console.log("Done!");
  });
});
