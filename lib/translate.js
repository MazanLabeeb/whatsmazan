//  THIS SCRIPT IS WRITTEN BY MAZAN LABEEB
// PLEASE DON'T FORGET TO GIVE CREDITS
const puppeteer = require('puppeteer');

module.exports.translate =  async  (input,lang) => {
  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 2000, //
});
  const page = await browser.newPage();
  await page.goto('https://translate.google.com/?sl=auto&tl='+lang+'&text='+input+'&op=translate');
 
//   await page.screenshot({path: 'example.png'});
await page.waitForSelector('.Q4iAWc');
 let result = await page.evaluate(()=>{
    let a = document.getElementsByClassName('Q4iAWc');
    // console.log(a[0].innerText)
    let db = "";
    for(let i = 0; i < a.length; i++){
        db = db+ a[i].innerText;
    }
    return db;
});
//   await page.waitFor(3000);
  await browser.close();
return(result)

};
