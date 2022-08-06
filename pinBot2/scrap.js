const puppeteer = require('puppeteer');
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');


var name;

module.exports.download = async function (userinput) {
  name = userinput;
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: false
    });

    // await page.setUserAgent(userAgent.toString())

    const page = await browser.newPage();
    await page.goto('https://www.nmc.org.uk/registration/search-the-register/');

    const data = await page.evaluate(async (name) => {

      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time)
        });
      }
      var input = document.getElementById("PinNumber");
      input.value = name;
      var btn = document.getElementById("searchRegisterButton");
      await delay(3000);
      btn.click();
      await delay(4000);

      var morelink = document.querySelectorAll(".more-link");

      try {
        var nextPage = morelink[0].href;
      } catch (error) {
        return false;
      }


      return nextPage;
    }, name);
    if (!data) {
      await browser.close();

      return reject();
    }
    var download = data;
    download = download.split('?')[0] + "?pdf=1";
    console.log("Link: " + download);


    const file = fs.createWriteStream("./public/" + name + ".pdf");
    const request = http.get(download, function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        console.log("Download Completed");
        resolve();
      });
    });

    await browser.close();

  })
};
