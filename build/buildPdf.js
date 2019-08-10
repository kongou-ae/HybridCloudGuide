const fs = require('fs');
const puppeteer = require('puppeteer');

const main = async() => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto(
    'https://aimlessvivliostyle.z11.web.core.windows.net/vivliostyle-viewer.html#b=src/book.html&renderAllPages=true', 
    {
      waitUntil: "networkidle0",
      timeout: "300000"  
    }
  );

  await page.pdf({
    path: 'dist/guideline2.pdf',
    printBackground: true,
    format: 'A4'
  });

  await browser.close();
  console.log('Built dist/guideline.pdf');
}

main()