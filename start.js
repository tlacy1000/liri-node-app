
// -------- Requires ----------
var axios = require("axios");
require('dotenv').config();
var fs = require("fs");
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// -------- Find Concert API ----------
function findConcert(artist){
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(url).then(
        function(response){
            // console.log(response.data);
            for(i in response.data){
                console.log("Venue: " + response.data[i].venue.name);
                console.log("City: " + response.data[i].venue.city);
                console.log("Region: " + response.data[i].venue.region);
                console.log("Country: " + response.data[i].venue.country);
                console.log("Event Date: " + response.data[i].datetime);
                console.log("Ticket Sale Start: " + response.data[i].on_sale_datetime);
                console.log("\n---------------------------\n");
            }
        },
    
        function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          }
    );
}

function spotifyID(song){
    if(song === undefined){
        song = "The Sign";
    } 
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items;
      for(var j = 0; j < songs.length; j++){
          
          var artists = "";
          for(var k = 0; k < songs[j].artists.length; k++){
            artists = artists+songs[j].artists[k].name + ", ";
          }
          console.log("Artist(s): " + artists);
          console.log("Song Title: " + songs[j].name);
          console.log("Preview: " + songs[j].preview_url);
          console.log("Album: " + songs[j].album.name);
          console.log("\n------------------------\n")
      } 
    //   console.log(data); 
      });
};


// -------- Movie API ---------- 
function findMovie(movieName){
    var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    if(movieName === undefined){
        movieName = "Mr. Nobody";
    };
    console.log(movieName)
    axios.get(url).then(

        function(response){
            console.log(response.data);
            
            console.log("\n---------------------------\n");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMBD Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("\n---------------------------\n");
        },
    
        function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` omes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );
}

// -------- command f(x)s ----------
function doSomething(){
    fs.readFile("random.txt", "utf8", function(err, data){
        console.log(data);
        var dataParts = data.split(",");
        if(dataParts.length === 2){
            console.log(dataParts[0]);
            console.log(dataParts[1]);
            commandProcess(dataParts[0].trim(), dataParts[1].trim());
        }
    })
}


// -------- command f(x)s ----------
function commandProcess(command, value){
    switch(command){
        case "concert-this":
            findConcert(value);
            break;
        
        case "spotify-this-song":
            spotifyID(value);
            break;
        case "movie-this":
            findMovie(value);
            break;
        case "do-what-it-says":
            doSomething();
            break;
        default:
            console.log("unknown command");
    }
}

var action = process.argv[2];
var value = process.argv.splice(3).join("+");


commandProcess(action, value);