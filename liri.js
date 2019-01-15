var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
 
var args = process.argv;

var srchinput = "";
console.log(Spotify);

for (var i = 3; i < args.length; i++){
    if (i > 3 && i < args.length){
        srchinput = srchinput + "+" + args[i]
        // console.log(srchinput);
    }
    else{
        srchinput += args[i]
        // console.log(srchinput);
    }
}


function srch(){
        if(args[2]==="laurel"){
                console.log("Yanni")
            }
        if(args[2]==="yanni"){
                console.log("Laurel")
            }
    if (args[2] === "movie"){
        var movieurl = "http://www.omdbapi.com/?t=" + srchinput + "&y=&plot=short&tomatoes=true&apikey=trilogy";
        // console.log(queryurl);

        axios.get(movieurl).then(
            function(response) {
                console.log("Title: " + response.data.Title)
                console.log("Year released: " + response.data.Year)
                console.log("Imdb Rating: " + response.data.imdbRating)
                console.log("Rotten Tomatoes score: " + response.data.tomatoRating)
                console.log("Produced in: " + response.data.Country)
                // console.log(response.data)
                console.log("Language: " + response.data.Language)
                console.log("Plot summary: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)

            }
        )
    }
    if (args[2] === "concert"){
        
        var concerturl = "https://rest.bandsintown.com/artists/" + srchinput + "/events?app_id=codingbootcamp";

        axios.get(concerturl).then(
            function(response){
                for (i=0; i<response.data.length; i++){
                var date = moment(response.data[i].datetime, "YYYY-MM-DD[T]HH:mm:ss").format("dddd, MMMM Do YYYY, h:mm A")
                console.log("Venue: " + response.data[i].venue.name);
                console.log("City: " + response.data[i].venue.city + ", " + response.data[0].venue.country);
                console.log("date/Time: " + date);
                console.log("\n")
                }
            }
        )
    }
     if (args[2] === "song"){
        
         spotify
         .search({ type: 'track', query: srchinput, limit: 5})
             .then(function(response) {
                 console.log(response.tracks.items[0].name)
                 console.log(response.tracks.items[0].artists[0].name)
                 console.log(response.tracks.items[0].external_urls.spotify)
             })
            .catch(function(err) {
                console.log(err);
            });
         
    }

}

        



srch()
