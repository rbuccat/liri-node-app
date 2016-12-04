var getKeys = require("./keys.js");
var myKeys = getKeys.twitterKeys
var action = process.argv[2];

switch (action) {
  case "my-tweets":
    mytweets();
    break;

  case "spotify-this-song":
  var song = "";
  var nodeArgs = process.argv;

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      song = song + "+" + nodeArgs[i];
    }
    else {
      song += nodeArgs[i];
    }
  }
    spotify(song);
    break;

  case "movie-this":
  var nodeArgs = process.argv;
  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    }
  }
    movie(movieName);
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

function mytweets(){
var Twitter = require('twitter');
 
var client = new Twitter(myKeys);
 
var params = {screen_name: 'richbuccat', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++){
    	console.log(tweets[i].text + ".... was created on.... " + tweets[i].created_at);
      console.log("-------------------------------")
    }
  }
});
}

function spotify(song){
var spotify = require('spotify');

spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else if (song === "") {
      spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function(err, data) {
        if ( err ) {
        console.log('Error occurred: ' + err);
        return;
        }
        else{
        console.log("-------------------------------")
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);
        console.log("-------------------------------")
        }
      });
    }
    else{
    //Do something with 'data'
    for(var j = 0; j < data.tracks.items.length; j++){
        console.log(data.tracks.items[j].album.artists[0].name);
        console.log(data.tracks.items[j].name);
        console.log(data.tracks.items[j].preview_url);
        console.log(data.tracks.items[j].album.name);
        console.log("-------------------------------")
        } 
    }  
});
}

function movie(movieName){
var request = require("request");

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";

if (movieName === ""){
  queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json&tomatoes=true"
  request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("-------------------------------")
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
    console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
    console.log("-------------------------------")
  }
});
}
  else {
  request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
  }
});
}
};

function doWhatItSays(){
var fs = require("fs");

fs.readFile("random.txt", "utf8", function(err, data){
  console.log(data);
  var dataArr = data.split(",")
  console.log(dataArr);

  if (dataArr[0] === 'spotify-this-song'){
      spotify(dataArr[1]);
  }
  else if (dataArr[0] === 'movie-this'){
      movie(dataArr[1]);
  }   
});
} 