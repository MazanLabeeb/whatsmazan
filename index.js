const qrcode = require('qrcode-terminal');
const fs = require("fs");
const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const ytdl = require('ytdl-core');    // youtube
const readline = require('readline');   //manual
const path = require("path"); //manual
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
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
var rmsg = `⚠️⚠️Command not found⚠️⚠️
Bro! currently you can download  youtube videos 📽️ only with this bot 🤖.

just type

youtube URL_OF_VIDEO

For example, 

youtube https://youtu.be/dX4Uk8QMiAs


Contact Mazan👦 for more details ♥️🇵🇰`;
/*********************************************************************************************************** */

client.on('message', message => {
  console.log(message.from + " : " + message.body);
});

client.on('message', message => {
  var foo = message.body;
  foo = foo.substring(0, 7);
  if (foo.toLowerCase() === "youtube") {
  } else {
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
  foo = foo.substring(0, 7);
  if (foo.toLowerCase() === "youtube") {
    var downloadPath = Date.now();
    var url = message.body.slice(8);

    const output = path.resolve(__dirname, './temp_files/' + downloadPath + '.mp4');


    if (ytdl.validateURL(url)) {
      message.reply("wait bro! video send horhi hai apko😍😍");
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
          client.sendMessage(message.from, media);
          client.sendMessage(message.from, 'Ye len Sir video 🙇‍♂️🙇‍♂️');
          fs.unlinkSync('./temp_files/' + downloadPath + '.mp4');
        } else {
          fs.unlinkSync('./temp_files/' + downloadPath + '.mp4');
          client.sendMessage(message.from, 'Sorry bro, ye video ka size kafi zyada hai.😢😞🥲 Try Anoher one 🙂🙂');
        }

      });


    } else {
      client.sendMessage(message.from, "Bro, youtube video ka link toh theek bhejen 🙏🏻🙏🏻");

    }

  }
});


// replying message with AUDIO SEND from our own pc   mp3
// client.on("message", async (message) => {
//   var foo = message.body;
//   foo = foo.substring(0, 11);
//   if (foo.toLowerCase() === "youtube mp3") {
//     var downloadPath = Date.now();
//     var url = message.body.slice(13);

//     // if (ytdl.validateURL(url)) {
//       message.reply("wait bro! apko mp3 file send horhi hai😍😍");

//       console.log(`'${url}'`);
      


//     // } else {
//     //   client.sendMessage(message.from, "Bro, Youtube Video ka link toh theek bhejen 🙏🏻🙏🏻");

//     // }

//   }
// });





