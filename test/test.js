const puppeteer = require('puppeteer');
const windows = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: windows
    });
    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/reel/1689000691471472/?s=ifu');
    let url = await page.evaluate(() => document.location.href);
    url = "https://mbasic." + url.slice(12);
    //   console.log(url);
    const page2 = await browser.newPage();
    await page2.goto(url);
    let result = await page2.evaluate(() => {
        const elements = document.querySelectorAll('[aria-label="Watch video"]');
        let hacked = elements[0].href;
        return hacked;
    });
    result = decodeURIComponent(result.slice(48));
    console.log(result);
    
    //   await browser.close();
})();
