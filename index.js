var Twitter = require('twitter');
var config = require('./config.js');

//User based authentication

var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
});

//Streaming API
var stream = client.stream('statuses/filter', {follow:27426152});
stream.on('data', function(event) {
    var regEx = /javacsript|jaavscript/gi;
    var match = event.text.match(regEx);
    console.log(match);
    console.log(event.text);
    if(match !== null) {
        console.log(event.text);
        client.post('statuses/update',
            {status: '@nigeljohnwade Sorry, *javascript*', in_reply_to_status_id: event.id},
            function (err, tweet) {
                if (!err) console.log(tweet)
            }
        );
    }
});

stream.on('error', function(error) {
    throw error;
});
