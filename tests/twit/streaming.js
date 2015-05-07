var TwitWrap = require('../../lib/models/twitter/TwitWrap');
var ImageStream = require('../../lib/models/twitter/ImageStream');

var twit = new TwitWrap();
//var imageStreaming =  new ImageStream(twit, 'user', {});
var imageStreaming =  new ImageStream(twit, 'statuses/filter', { track: 'cloud' });

imageStreaming.on('tweet/image', function (tweet, medias, retweetFrom) {
    //console.log(tweet);
    medias.forEach(function (media) {
        console.log('cloud', media.media_url);
    })
});

imageStreaming.on('error', function (err) {
    console.log('***** error *****');
    console.log(err);
});

/////

var imageStreaming2 =  new ImageStream(twit, 'statuses/filter', { track: 'night' });

imageStreaming2.on('tweet/image', function (tweet, medias, retweetFrom) {
    //console.log(tweet);
    medias.forEach(function (media) {
        console.log('night', media.media_url);
    })
});

imageStreaming2.on('error', function (err) {
    console.log('***** error *****');
    console.log(err);
});