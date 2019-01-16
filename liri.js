require("dotenv").config();
const Spotify = require('node-spotify-api');
const axios = require('axios');
const keys = require("./keys.js");
// console.log(keys.spotify);
const spotify = new Spotify(keys.spotify);

let liriCommand = process.argv[2];
let liriString = process.argv[3];

// console.log(`Command ${liriCommand} and string ${liriString}`);

switch (liriCommand) {
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + liriString + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        break;
    case "spotify-this-song":
        if (typeof liriString === "undefined") {
            liriString = "The Sign, Ace of Base";
            // console.log(liriString);
        }
        spotify.search({ type: 'track', query: liriString, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data);
            console.log("--------------------------------------------------------------------");
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Track name: ${data.tracks.items[0].name}`);
            if (data.tracks.items[0].preview_url === null) {
                console.log("No preview available...");
            } else {
                console.log(`Preview URL: ${data.tracks.items[0].preview_url}`);
            }
            console.log(`Album: ${data.tracks.items[0].album.name}`);
            console.log("--------------------------------------------------------------------");
        });
        break;
    case "movie-this":
        if (typeof liriString === "undefined") {
            liriString = "Mr Nobody";
            // console.log(liriString);
        }
        axios.get(`http://www.omdbapi.com/?apikey=trilogy&s=${liriString}`)
            .then(function (response) {
                // console.log(response.data.Search[0].imdbID);
                let tempImdbID = response.data.Search[0].imdbID;
                // console.log(tempImdbID);
                axios.get(`http://www.omdbapi.com/?apikey=trilogy&i=${tempImdbID}`)
                    .then(function (response2) {
                        console.log("--------------------------------------------------------------------");
                        console.log(`Title: ${response2.data.Title}`);
                        console.log(`Year: ${response2.data.Year}`);
                        console.log(`IMDB Rating: ${response2.data.imdbRating}`);
                        console.log(`Rotten Tomatoes Rating: ${response2.data.Ratings[1].Value}`)
                        console.log(`Country Produced: ${response2.data.Country}`);
                        console.log(`Language: ${response2.data.Language}`);
                        console.log(`Plot: ${response2.data.Plot}`);
                        console.log(`Actors: ${response2.data.Actors}`);
                        console.log("--------------------------------------------------------------------");
                        // console.log(response2.data.Ratings);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        break;
    case "do-what-it-says":
        //code block
        break;
    default:
    //code block
}