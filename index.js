const qrcode = require('qrcode-terminal');
const fs = require("fs");
const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const ytdl = require('ytdl-core');    // youtube
const yts = require('yt-search');
const readline = require('readline');   //manual
const path = require("path"); //manual
const fbdown = require("./lib/fbdown")
const http = require("https");

const linux = "/usr/bin/google-chrome";
const windows = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: linux

  }
});


client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();

var people = [];
/*********************************************************************************************************** */
var rmsg = `⚠️ Invalid Command

type *_help_* to see available commands`;
var help = `Supported Commands:

1️⃣➡️  ytmp4 link
2️⃣➡️  ytmp3 link
3️⃣➡️  ytsearch cricket match
4️⃣➡️  fb facebookvideokalink
5️⃣➡️  sticker
6️⃣➡️  help

Contact Mazan👦 for more details 🇵🇰♥️`;
/*********************************************************************************************************** */

client.on('message', message => {
  console.log(message.from + " : " + message.body);
});


var commands = ["ytmp4", "ytmp3", "ytsearch", "fb", "sticker"];
client.on('message', async (message) => {
  var foo = message.body.toLowerCase();
  if (commands.filter((f) => foo.startsWith(f)).length == 1) {
    //  JUST DO NOTHING
  } else if (message.body.toLocaleLowerCase() === "help") {
    const typing = await message.getChat(); typing.sendStateTyping();
    message.reply(help);
  } else if (message.body.startsWith('thank') || message.body.startsWith('thanks')) {
    const typing = await message.getChat(); typing.sendStateTyping();

    message.reply("No problem!");
  } else {
    var len = (people.filter((d) => d === message.from)).length;
    if (len < 1) {
      const contact = await message.getContact();
      const chat = await message.getChat();
      chat.sendMessage(`Welcome @${contact.number}!`, {
        mentions: [contact]
      });
      const typing = await message.getChat(); typing.sendStateTyping();

      client.sendMessage(message.from, help);
      people.push(message.from); console.log("People: " + people.toString());
    } else {
      // message.react('👍');
      if (Math.floor(Math.random() * 4) == 3) {
        const typing = await message.getChat(); typing.sendStateTyping();
        message.reply(rmsg);
      }
    }
  }
});


client.on('ready', () => {
  const number = "+923061695230";
  const text = "helo Mazan! I am online ♥️";
  const chatId = number.substring(1) + "@c.us";
  // Sending message.
  client.sendMessage(chatId, text);
});



//    AUTOMATION
client.on("message", async (message) => {
  var foo = message.body.toLowerCase();
  var foo = commands.filter((i) => foo.startsWith(i.toLowerCase()))[0];
  switch (foo) {
    case "ytmp4": {
      //  --------------  START  OF CASE --------------------
      const typing = await message.getChat(); typing.sendStateTyping();

      var downloadPath = Date.now();
      var url = message.body.slice(6);

      const output = path.resolve(__dirname, './temp_files/' + downloadPath + '.mp4');

      if (ytdl.validateURL(url)) {
        ytdl.getBasicInfo(url).then((data) => {

          let URL = data.formats[0].url;
          let title = data.videoDetails.title;
          let channel = data.videoDetails.ownerChannelName;
          let views = nFormatter(data.videoDetails.viewCount);
          let likes = nFormatter(data.videoDetails.likes);
          let videoId = data.videoDetails.videoId;
          let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;


          // console.log("URL: "+(data.formats[0].url));
          console.log("Title: " + data.videoDetails.title);
          console.log("Channel: " + data.videoDetails.ownerChannelName);
          console.log("Views: " + data.videoDetails.viewCount);
          console.log("Likes: " + data.videoDetails.likes);
          console.log("Age-restricted: " + data.videoDetails.age_restricted);
          let cap = `📛 *Title* :  ${title}\n🆔 *Channel* : ${channel}\n🎦 *Views*: ${views}\n👍🏻 *Likes*: ${likes}`;

          if (!data.videoDetails.age_restricted) {


            message.reply("Wait dear! video send horhi hai apko😍");
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
              var stats = fs.statSync(output);
              var fileSizeInBytes = stats.size;
              var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
              if (fileSizeInMegabytes < 16) {
                const media = MessageMedia.fromFilePath('./temp_files/' + downloadPath + '.mp4');
                client.sendMessage(message.from, media, { caption: cap });
                fs.unlinkSync(output);
              } else if (fileSizeInMegabytes < 50) {
                MessageMedia.fromUrl(thumbnail).then((pic) => {
                  client.sendMessage(message.from, pic, { caption: cap });
                });
    

                const media = MessageMedia.fromFilePath(output);
                client.sendMessage(message.from, media, { sendMediaAsDocument: true });
                fs.unlinkSync(output);
              } else {
                fs.unlinkSync(output);
                client.sendMessage(message.from, `🚫 ERROR 🚫\n⚠️ Sorry dear, WhatsApp  doesn't allow sending file 📁 larger than 100 Mb 😔`);
              }

            });
          } else {
            client.sendMessage(message.from, "Oops! Age Restricted videos nai download kr skty aap...🙏🏻");
          }

        });
      } else {
        client.sendMessage(message.from, "Bro, youtube video ka link toh theek bhejen 🙏🏻🙏🏻");
      }
      //  --------------  END OF CASE --------------------
      break;
    }
    case "ytmp3": {
      //  --------------  START  OF CASE --------------------

      const typing = await message.getChat(); typing.sendStateTyping();

      var downloadPath = Date.now();
      var url = message.body.slice(6);

      const output = path.resolve(__dirname, './temp_files/' + downloadPath + '.mp4');
      const output3 = path.resolve(__dirname, './temp_files/' + downloadPath + '.mp3');

      if (ytdl.validateURL(url)) {
        ytdl.getBasicInfo(url).then((data) => {

          let URL = data.formats[0].url;
          let title = data.videoDetails.title;
          let channel = data.videoDetails.ownerChannelName;
          let views = nFormatter(data.videoDetails.viewCount);
          let likes = nFormatter(data.videoDetails.likes);
          let videoId = data.videoDetails.videoId;
          let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;


          // console.log("URL: "+(data.formats[0].url));
          console.log("Title: " + data.videoDetails.title);
          console.log("Channel: " + data.videoDetails.ownerChannelName);
          console.log("Views: " + data.videoDetails.viewCount);
          console.log("Likes: " + data.videoDetails.likes);
          console.log("Age-restricted: " + data.videoDetails.age_restricted);
          let cap = `📛 *Title* :  ${title}\n🆔 *Channel* : ${channel}\n🎦 *Views*: ${views}\n👍🏻 *Likes*: ${likes}`;

          if (!data.videoDetails.age_restricted) {

            message.reply("Wait dear! audio send horhi hai apko😍");


            const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
            const ffmpeg = require('fluent-ffmpeg');
            ffmpeg.setFfmpegPath(ffmpegPath);
            let id = videoId;

            let stream = ytdl(id, {
              quality: 'highestaudio',
            });

            let start = Date.now();
            ffmpeg(stream)
              .audioBitrate(128)
              .save(output3)
              .on('progress', p => {
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
              })
              .on('end', () => {
                console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
                MessageMedia.fromUrl(thumbnail).then((pic) => {
                  client.sendMessage(message.from, pic, { caption: cap });
                });
                var stats = fs.statSync(output3);
                var fileSizeInBytes = stats.size;
                var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes < 16) {
                  const media = MessageMedia.fromFilePath(output3);
                  client.sendMessage(message.from, media);
                  fs.unlinkSync(output3);
                } else if (fileSizeInMegabytes < 50) {
                  const media = MessageMedia.fromFilePath(output3);
                  client.sendMessage(message.from, media, { sendMediaAsDocument: true });
                  fs.unlinkSync(output3);
                } else {
                  fs.unlinkSync(output3);
                  client.sendMessage(message.from, `🚫 ERROR 🚫\n⚠️ Sorry dear, WhatsApp  doesn't allow sending file 📁 larger than 100 Mb 😔`);
                }


              });
          } else {
            client.sendMessage(message.from, "Oops! Age Restricted videos nai download kr skty aap...🙏🏻");
          }

        });
      } else {
        client.sendMessage(message.from, "Bro, youtube video ka link toh theek bhejen 🙏🏻🙏🏻");
      }

      //  --------------  END OF CASE --------------------
      break;
    }
    case "ytsearch": {
      //  --------------  START  OF CASE --------------------
      var init = async () => {
        var query = message.body.slice(9);
        if (query == "") {
          client.sendMessage(message.from, "Kindly ytsearch k aagy b kuch likhen  🙏🏻🙏🏻");
          query = "Mazan Labeeb";
        }
        const r = await yts(query)
        const videos = r.videos.slice(0, 5)
        videos.forEach(function (v) {
          let thumbnail = v.thumbnail;
          let cap = `📛 *Title* :  ${v.title}\n⏱️ *Duration*: ${v.timestamp}\n🆔 *Channel* : ${v.author.name}\n🎦 *Views*: ${nFormatter(v.views)}\n🌐 *Posted*: ${v.ago}\n🔗 *Link*: ${v.url}`;
          // console.log(cap)
          // console.log(v.thumbnail);
          MessageMedia.fromUrl(thumbnail).then((pic) => {
            client.sendMessage(message.from, pic, { caption: cap });
          });
          // console.log(v.url)
        })
      }
      init();
      //  --------------  END OF CASE --------------------
      break;
    }
    case "fb": {
      //  --------------  START  OF CASE --------------------
      var url = message.body.slice(3);
      let cap = "👀Ye len Sir 🫡";

      fbdown.fetch(url).then((d) => {
        const output = path.resolve(__dirname, './' + Date.now() + "." + "mp4");
        const file = fs.createWriteStream(output);
        const request = http.get(d, function (response) {
          response.pipe(file);
          // after download completed close filestream
          file.on("finish", () => {
            file.close();
            var stats = fs.statSync(output);
            var fileSizeInBytes = stats.size; var size = fileSizeInBytes / (1024 * 1024);
            console.log(`SIZE : ${size.toFixed(2)} Mb`)
            message.reply("Wait dear! video send horhi hai apko😍");

            if (size < 16) {
              const media = MessageMedia.fromFilePath(output);
              client.sendMessage(message.from, media, { caption: cap });
              fs.unlinkSync(output);
            } else if (size < 99) {
              const media = MessageMedia.fromFilePath(output);
              client.sendMessage(message.from, media, { sendMediaAsDocument: true });
              fs.unlinkSync(output);
            } else {
              fs.unlinkSync(output);
              client.sendMessage(message.from, `🚫 ERROR 🚫\n⚠️ Sorry dear, WhatsApp  doesn't allow sending file 📁 larger than 100 Mb 😔`);
            }
          });
        });

      }).catch((e) => {
        message.getChat().then((d) => d.sendStateTyping());
        message.reply(`Sorry something went wrong.😢Please send the valid facebook url. 😞`);
        console.log(e);
      })


      //  --------------  END OF CASE --------------------
      break;
    }
    case "sticker": {
      var msg = message;
      if (msg.hasMedia) {
        const attachmentData = await msg.downloadMedia();
        const output = path.resolve(__dirname, './temp_files/' + Date.now() + "." + attachmentData.mimetype.slice(6));

        if (attachmentData.mimetype.startsWith("image")) {
          fs.writeFile(
            output,
            attachmentData.data,
            "base64",
            function (err) {
              if (err) {
                console.log(err);
              } else {
                // //  CONVERSION
                const jpgImage = MessageMedia.fromFilePath(output);
                client.sendMessage(msg.from, jpgImage, { sendMediaAsSticker: true }).then((d) => {
                  console.log("Sticker sent");
                }).catch((e) => {
                  console.log(e)
                });

                fs.unlinkSync(output);
              }
            }
          );


        } else {
          msg.reply("Sorry, I can make stickers of static images only.😣😔");
        }
      } else {
        let cap = `Please 🙏🏻 send image  with caption Sticker. For example, `;
        const media = MessageMedia.fromFilePath('./files/demosticker.jpeg');
        client.sendMessage(msg.from, media, { caption: cap });
      }
      break;
    }
    default: {
      //  --------------  START  OF CASE --------------------

      console.log("default")
      //  --------------  END OF CASE --------------------

    }
  }

});





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
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}