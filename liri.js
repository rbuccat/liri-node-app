var getKeys = require("./keys.js");
var myKeys = getKeys.twitterKeys
var action = process.argv[2];

// for (var key in myKeys) {
//   console.log("The " + key + " is " + myKeys[key] + ".");
// }
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

}

function movie(){

}

function doWhatItSays(){

}