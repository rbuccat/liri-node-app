var getKeys = require("./keys.js");
var myKeys = getKeys.twitterKeys
var action = process.argv[2];

switch (action) {
  case "my-tweets":
    mytweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
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
    }
  }
});
}

function spotify(){
var spotify = require('spotify');
var song = process.argv[3];
 
spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);

});
}

function movie(){

}

function doWhatItSays(){

}