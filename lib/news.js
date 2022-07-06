const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var striptags = require('striptags');

let getnews = async function (url) {
    const response = await fetch(url);
    const body = await response.text();
    const dom = new JSDOM(body);
    let b = dom.window.document.querySelector('.story__content');
    let db = "";
    for (var i = 0; i < b.children.length; i++) {
        if (b.children[i].tagName == "P") {
            db += striptags(b.children[i].innerHTML.trim());
        }
    }
    return db;
    // console.log(data[0].title)
};


let exe = async function (no) {
    const response = await fetch('https://www.dawn.com/latest-news');
    const body = await response.text();
    const dom = new JSDOM(body);
    let a = dom.window.document.getElementsByClassName('story__link');
    let b = dom.window.document.getElementsByClassName('media__item');
    var data = [];
    var content = [];
    for (let i = 0; i < no; i++) {
       await getnews(b[i].firstChild.href).then((data) => {
        content.push({
                "title": a[i].innerHTML,
                "thumbnail": b[i].firstChild.firstChild.firstChild.src,
                "body": data
            });
        })
        
    }
  
            return content;


};

module.exports.news = function(no){
    return new Promise((resolve, reject)=>{
        let a = exe(no);
        resolve(a);
    })
}