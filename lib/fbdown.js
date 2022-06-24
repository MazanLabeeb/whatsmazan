//      SCRIPT MADE BY MAZAN LABEEB, PLEASE GIVE CREDITES WHILE USING THIS SCRIPT
const { axios, request } = require("axios");
const { JSDOM } = require("jsdom");
module.exports.fetch = (url) => {
    return new Promise((resolve, reject) => {
        var fuck = url;
        const options = {
            method: 'POST',
            url: 'https://scrapeninja.p.rapidapi.com/scrape',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'a927ba3601mshc66b0340928b126p12f63fjsna01a6e834c95',
                'X-RapidAPI-Host': 'scrapeninja.p.rapidapi.com'
            },
            data: '{"geo":"eu","url":"https://fdown.net//download.php","headers":["Content-Type: application/x-www-form-urlencoded"],"method":"POST","data":"URLz=' + fuck + '"}'
        };

        request(options).then(function (response) {

            fuck = response.data.body;
            const dom = new JSDOM(fuck);
            var fetched = dom.window.document.getElementById("hdlink");
            var fetched2 = dom.window.document.getElementById("sdlink");

            if (fetched) {
                //   console.log(fetched.href); // "Hello world"
                console.log("HD QUAILTY")
                resolve(fetched.href);
            } else if (fetched2) {
                //   console.log(fetched2.href); // "Hello world" 
                console.log("SD QUAILTY")
                resolve(fetched2.href);
            } else {
               reject('FBDOWN ISSUE');
            }

        }).catch(function (error) {
            reject('API EXPIRED');
        });
    });
}