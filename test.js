const news = require("./lib/news");

news.news(5).then((data)=>{
    console.log(data[0].body);
});