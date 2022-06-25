const readline = require('readline');
const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');

const url = 'https://youtube.com/watch?v=rj1eYggRvXk';
const output = path.resolve(__dirname, 'video.mp4');

const video = ytdl.getBasicInfo(url).then((d)=>{
    console.log();
});

