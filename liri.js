require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
console.log(keys.spotify);
const spotify = new Spotify(keys.spotify);

let liriCommand = process.argv[2];
let liriString = process.argv[3];

// console.log(`Command ${liriCommand} and string ${liriString}`);

switch (liriCommand) {
    case "concert-this":
        //code block
        break;
    case "spotify-this-song":
        if(liriCommand==="spotify-this-song" && (typeof liriString==="undefined")){
            liriString = "Ace of Base";
            // console.log(liriString);
        }
        spotify.search({ type: 'track', query: liriString }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data);
        });
        break;
    case "movie-this":
        //code block
        break;
    case "do-what-it-says":
        //code block
        break;
    default:
    //code block
}