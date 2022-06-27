//  PROUDFULLY CODED BY MAZAN LABEEB PLEASE DONT STEAL CODE OR GIVE CREDITS
module.exports.tts = function (input, person) {
    var track = ["0", "1", "2", "3"];
    if(track.filter((d)=> d == input).length != 1)input = 0;

    var voices = ["ur-PK-UzmaNeural", "ur-PK-AsadNeural", "en-CA-ClaraNeural", "en-CA-LiamNeural"];

    "use strict";
    return new Promise((resolve, reject) => {

        var sdk = require("microsoft-cognitiveservices-speech-sdk");

        var key = "349b5da5d392445387d0da78f20bdbb0";
        var region = "eastus";
        var audioFile = "./temp_files/"+Date.now() + ".mp3";


        const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;
        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);
        

        // The language of the voice that speaks.

        speechConfig.speechSynthesisVoiceName = voices[person - 1];


        // Create the speech synthesizer.
        var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);


        var text = input;

        // Start the synthesizer and wait for a result.
        synthesizer.speakTextAsync(text,
            function (result) {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    resolve(audioFile);
                    // console.log("synthesis finished.");
                } else {
                    reject({ err: result.errorDetails });
                }
                synthesizer.close();
                synthesizer = null;
            },
            function (err) {
                console.trace("err - " + err);
                synthesizer.close();
                synthesizer = null;
            });
        // console.log("Now synthesizing to: " + audioFile);


        
    });
};


