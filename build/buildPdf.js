const fs = require('fs');
const puppeteer = require('puppeteer');

const main = async() => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto(
    'http://localhost:8080/vivliostyle/viewer/vivliostyle-viewer.html#b=build/book.html&renderAllPages=true', 
    {
      waitUntil: "networkidle0",
      timeout: "300000"  
    }
  );

  await page.pdf({
    path: 'dist/guideline.pdf',
    printBackground: true,
    format: 'A4'
  });

  await browser.close();
  console.log('Built dist/guideline.pdf');
}

main()
