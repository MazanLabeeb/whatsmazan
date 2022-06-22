function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
let converted = ("1000");
console.log(converted);
  
  // let { ytv } = require('./lib/y2mate')
 
  // // let quality = args[1] ? args[1] : '360p'
  // let media =   ytv(text, '360p').then((data=>{
  //   console.log(data);
  // }))

//   let { yta } = require('./lib/y2mate')
//   let text = "https://www.youtube.com/watch?v=-05P5FB4AJc";
//   let quality = '320kbps';
//   let media =   yta(text, quality).then((data)=>{
//     console.log(data);
//   });
 
// let str = "ytmp3mazanlabeeb";
// console.log(str.slice(6));

//   GojoMdNx.sendImage(m.chat, media.thumb, `🐦 Title : ${media.title}\n🐦 File Size : ${media.filesizeF}\n🐦 Url : ${isUrl(text)}\n🐦 Ext : MP3\n🐦 Resolution : ${args[1] || '320kbps'}`, m)
//   GojoMdNx.sendMessage(m.chat, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: m })
