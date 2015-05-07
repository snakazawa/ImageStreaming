var util = require("util");
var Twit = require('twit');
var config = require('config');

function ImageStream(twit, path, params) {
    this.twit = twit;
    this.stream = twit.stream(path, params);

    this.on('tweet', this.imageFilter.bind(this));
}

ImageStream.prototype.on = function () { this.stream.on.apply(this.stream, arguments); };

ImageStream.prototype.emit = function () { this.stream.emit.apply(this.stream, arguments); };

ImageStream.prototype.imageFilter = function (tweet, retweetFrom) {
    // retweetだったらretweetされたtweetを対象にする
    if (tweet.retweeted_status) {
        this.imageFilter(tweet.retweeted_status, tweet);
        return;
    }

    var media = tweet.entities.media;

    // 画像が存在しなかったら何もしない
    if (!media) { return; }

    this.emit('tweet/image', tweet, media, retweetFrom);
};

module.exports = ImageStream;
