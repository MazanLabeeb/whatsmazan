
  let { ytv } = require('./lib/y2mate')
 
  // let quality = args[1] ? args[1] : '360p'
  let media =   ytv(text, '360p').then((data=>{
    console.log(data);
  }))

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
