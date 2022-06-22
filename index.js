const qrcode = require('qrcode-terminal');
const fs = require("fs");
const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const ytdl = require('ytdl-core');    // youtube
const readline = require('readline');   //manual
const path = require("path"); //manual
const axios = require("axios");
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);


const linux = "/usr/bin/google-chrome";
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: chrome,
  }
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();


/*********************************************************************************************************** */
var rmsg = `⚠️Command not found⚠️

❤️🧡💛💚💙💜🖤🤍
 Type help to see available commands
❤️🧡💛💚💙💜🖤🤍`;
var help = `Supported Commands:

1️⃣➡️  ytmp4 URL
2️⃣➡️  ytmp3 URL
3️⃣➡️  help

Contact Mazan👦 for more details 🇵🇰♥️`;
/*********************************************************************************************************** */

client.on('message', message => {
  console.log(message.from + " : " + message.body);
});

client.on('message', message => {
  var foo = message.body.toLowerCase();
  if (foo.substring(0, 5) === "ytmp4" || foo.substring(0, 5) === "ytmp3") {
  } else if(message.body.toLocaleLowerCase() === "help"){
    message.reply(help);
  } else if(foo == "thanks"){
    message.reply("No problem!");
  }else {
    message.reply(rmsg);
  }
});


client.on('ready', () => {
  // Number where you want to send the message.
  const number = "+923061695230";
  // Your message.
  const text = "helo Mazan! I am online ♥️";

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number.substring(1) + "@c.us";

  // Sending message.
  client.sendMessage(chatId, text);

});



// replying message with VIDEO SEND from our own pc
client.on("message", async (message) => {
  var foo = message.body; 
  foo = foo.substring(0, 5);
  if (foo.toLowerCase() === "ytmp4") {
    var downloadPath = Date.now();
    var url = message.body.slice(6);

    const output = path.resolve(__dirname, './temp_files/' + downloadPath + '.mp4');


    if (ytdl.validateURL(url)) {
      message.reply("😍Wait Dear! Video send horhi hai apko😍");
      
          /************************************************************* */
          
          /************************************************************* */
               
               
          let { ytv } = require('./lib/y2mate')
          let text = url;
          // let quality = args[1] ? args[1] : '360p'

          console.log(`"${url}"`)
          let ytv_ = await  ytv(text, '360p');
          console.log( ytv_);
          
          if(ytv_.filesize < 16000 || isNaN(ytv_.filesize)){
                // const media2 =  await  MessageMedia.fromUrl(ytv_.thumb);
                let cap = `*🖼️ ${ytv_.title}*`;
                let file = ytv_.dl_link;
                let mimetype;
                let filename;
                const attachment = await axios.get(file, {
                responseType: 'arraybuffer'
                }).then(response => {
                mimetype = response.headers['content-type'];
                filename = file.split("/").pop();
                return response.data.toString('base64');
                });
                
                if( attachment ){
                const media = new MessageMedia(mimetype, attachment, filename);
      
                client.sendMessage(message.from, media, {caption: cap });
                }
          }else if(ytv_.filesize < 100000){
                  const media2 =  await  MessageMedia.fromUrl(ytv_.thumb);
                  let cap = `*🖼️ ${ytv_.title}*`;
                  client.sendMessage(message.from,media2,{caption: cap});
                  let file = ytv_.dl_link;
                  let mimetype;
                  let filename;
                  const attachment = await axios.get(file, {
                  responseType: 'arraybuffer'
                  }).then(response => {
                  mimetype = response.headers['content-type'];
                  filename = ytv_.title;
                  return response.data.toString('base64');
                  });
                  
                  if( attachment ){
                  const media = new MessageMedia(mimetype, attachment, filename);
        
                  client.sendMessage(message.from, media, {caption: 'this is my caption', sendMediaAsDocument: true });
                  }
          }else{
            client.sendMessage(message.from, 'Sorry Dear, ye Video ka size kafi zyada hai.😢😞🥲 Try Anoher one 🙂🙂');
          }
          
    } else {
      client.sendMessage(message.from, "Bro, youtube video ka link toh theek bhejen 🙏🏻🙏🏻");

    }

  }
});


// replying message with AUDIO SEND from our own pc   mp3
client.on("message", async (message) => {
  var foo = message.body;
  foo = foo.substring(0, 5);
  if (foo.toLowerCase() === "ytmp3") {
    var url = message.body.slice(6);

    if (ytdl.validateURL(url)) {
      message.reply("😍Wait Dear! apko mp3 send horhi hai😍");

      let { yta } = require('./lib/y2mate')
      let quality = '320kbps';
      let ytv_ =  await yta(url, quality)
      
      console.log(ytv_);
      const media2 =  await  MessageMedia.fromUrl(ytv_.thumb);
      let cap = `*🖼️ ${ytv_.title}*`;
      client.sendMessage(message.from,media2,{caption: cap});

      let file = ytv_.dl_link;
      
      let mimetype;
      let filename;
      const attachment = await axios.get(file, {
      responseType: 'arraybuffer'
      }).then(response => {
      mimetype = response.headers['content-type'];
      filename = file.split("/").pop();
      return response.data.toString('base64');
      });
      
      if( attachment ){
      const media = new MessageMedia(mimetype, attachment, filename);

      client.sendMessage(message.from, media, {caption: cap });
      }

    } else {
      client.sendMessage(message.from, "Bro, Youtube Video ka link toh theek bhejen 🙏🏻🙏🏻");
    }

  }
});


//===============================================================


// client.on("message", async (message) => {
//   if (message.body === "meme") {

//            const media =  await  MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
//             client.sendMessage(message.from,media);
            

//     // const media = await MessageMedia.fromUrl('https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4');
//     // client.sendMessage(message.from, media);
//     // let file = "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

//     // let mimetype;
//     // let filename;
//     // const attachment = await axios.get(file, {
//     // responseType: 'arraybuffer'
//     // }).then(response => {
//     // mimetype = response.headers['content-type'];
//     // filename = file.split("/").pop();
//     // return response.data.toString('base64');
//     // });
    
//     // if( attachment ){
//     // const media = new MessageMedia(mimetype, attachment, filename);

//     // client.sendMessage(message.from, media, {caption: 'this is my caption', sendMediaAsDocument: true });
//     // }


      
//   }
// });