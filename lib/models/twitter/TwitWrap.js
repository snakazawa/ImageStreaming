var util = require("util");
var Twit = require('twit');
var config = require('config');

function TwitWrap() {
    Twit.call(this, {
        consumer_key:         config.get('twitter.consumer.key'),
        consumer_secret:      config.get('twitter.consumer.secret'),
        access_token:         config.get('twitter.access.token'),
        access_token_secret:  config.get('twitter.access.secret')
    });
}

util.inherits(TwitWrap, Twit);

module.exports = TwitWrap;
