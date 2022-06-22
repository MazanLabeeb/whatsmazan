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

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
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
      ytdl.getBasicInfo(url).then((data)=>{

        let URL = data.formats[0].url;
        let title = data.videoDetails.title;
        let channel = data.videoDetails.ownerChannelName;
        let views = nFormatter(data.videoDetails.viewCount) ;
        let likes = nFormatter(data.videoDetails.likes);
        let videoId = data.videoDetails.videoId;
        let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;


        // console.log("URL: "+(data.formats[0].url));
        console.log("Title: "+data.videoDetails.title);
        console.log("Channel: "+data.videoDetails.ownerChannelName);
        console.log("Views: "+data.videoDetails.viewCount);
        console.log("Likes: "+data.videoDetails.likes);
        console.log("Age-restricted: "+data.videoDetails.age_restricted);
        let cap =  `📛 *Title* :  ${title}
🆔 *Channel* : ${channel}
🎦 *Views*: ${views}
👍🏻 *Likes*: ${likes}`;

        if(!data.videoDetails.age_restricted){
              message.reply("Wait dear! video send horhi hai apko😍😍");
              const video = ytdl(url);
              console.log("Video Url Ok"); video.pipe(fs.createWriteStream(output));
              video.once('response', () => {
                starttime = Date.now();
              });
              video.on('progress', (chunkLength, downloaded, total) => {
                const percent = downloaded / total;
                const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
                process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
                process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
                process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
                readline.moveCursor(process.stdout, 0, -1);
              });
              video.on('end', () => {
                process.stdout.write('\nDownload complete, now sending to user...\n\n');
                var stats = fs.statSync('./temp_files/' + downloadPath + '.mp4');
                var fileSizeInBytes = stats.size;
                var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes < 16) {
                  const media = MessageMedia.fromFilePath('./temp_files/' + downloadPath + '.mp4');
                  client.sendMessage(message.from, media,{caption: cap });
                  fs.unlinkSync('./temp_files/' + downloadPath + '.mp4');
                }else if(fileSizeInMegabytes < 100){
                  MessageMedia.fromUrl(thumbnail).then((pic)=>{
                    client.sendMessage(message.from,pic,{caption: cap});
                  });

                  const media = MessageMedia.fromFilePath('./temp_files/' + downloadPath + '.mp4');
                  client.sendMessage(message.from, media,{sendMediaAsDocument: true});
                  fs.unlinkSync('./temp_files/' + downloadPath + '.mp4');
                } else {
                  fs.unlinkSync('./temp_files/' + downloadPath + '.mp4');
                  client.sendMessage(message.from, `🚫 ERROR 🚫
                  ⚠️ Sorry dear, WhatsApp  doesn't allow sending file 📁 larger than 100 Mb 😔`);
                }

              });
        }else{
          client.sendMessage(message.from, "Oops! Age Restricted videos nai download kr skty aap...🙏🏻");
        }
    
      });
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