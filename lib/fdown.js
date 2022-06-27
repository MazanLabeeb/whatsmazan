var axios = require('axios');

module.exports.fetch = (url) => {
    return new Promise((resolve, reject) => {
        var FormData = require('form-data');
        var data = new FormData();
        data.append('URLz', 'https://m.facebook.com/groups/242996866807218/permalink/722893478817552/?ref=share');
        data.append('', '');

        var config = {
            method: 'post',
            url: 'https://fdown.net//download.php?URLz=https://www.facebook.com/dcmjunior/videos/1794891250528272/',
            headers: {
                ...data.getHeaders()
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                fuck = response.data;
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

            })
            .catch(function (error) {
                // console.log(error);
               reject('cloudflare issue');

            });
    });
}