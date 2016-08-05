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
    console.log(event);
    if(event.text.indexOf('javacsript') > -1) {
        console.log(event);
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
