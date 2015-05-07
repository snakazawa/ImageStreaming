var util = require("util");
var Twit = require('twit');
var config = require('config');
var _ = require('lodash');

function TwitWrap(o) {
    Twit.call(this, _.defaults(o || {}, {
        consumer_key:         config.get('twitter.consumer.key'),
        consumer_secret:      config.get('twitter.consumer.secret'),
        //access_token:         config.get('twitter.access.token'),
        //access_token_secret:  config.get('twitter.access.secret')
    }));
}

util.inherits(TwitWrap, Twit);

module.exports = TwitWrap;
