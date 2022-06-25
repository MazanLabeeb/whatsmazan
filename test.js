const ytdl  = require('ytdl-core');
const url   = require('url');
const https = require('https');
const fs    = require('fs');

var limit = 1024 * 1024 * 250;
var videoID = 'https://www.youtube.com/watch?v=3nQNiWdeH2Q';

ytdl.getInfo(videoID).then((info) => {
  var formats = info.formats.slice();
  function tryNextFormat() {
    var format = formats.shift();
    if (!format) {
      console.log('No format foudn within the limit');
      return;
    }
    var parsed = url.parse(format.url);
    parsed.method = 'HEAD'; // We only want headers to get the filesize
    https.request(parsed, (response) => {
      console.log('format', response.headers);
      if (parseInt(response.headers['content-length']) <= limit) {
        console.log('Found a format within limit, downloading...');
        var output = `${__dirname}/output.${format.container}`;
        ytdl.downloadFromInfo(info, { format })
          .pipe(fs.createWriteStream(output));
      } else {
        tryNextFormat();
      }
    }).end();
  }
  tryNextFormat();
});