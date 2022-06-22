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
               
                var stats = fs.statSync(output);
                var fileSizeInBytes = stats.size;
                var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                 if(fileSizeInMegabytes < 100){
                 
                } else {
                  fs.unlinkSync(output);
                  client.sendMessage(message.from, `🚫 ERROR 🚫
                  ⚠️ Sorry dear, WhatsApp  doesn't allow sending file 📁 larger than 100 Mb 😔`);
                }

              });