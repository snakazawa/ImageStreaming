(function ($, _, io, util) {
    'use strict';

    var viewmodel = util.namespace('ImageStreaming.viewmodel'),
        model = util.namespace('ImageStreaming.model'),
        Socket = model.Socket,
        defaultOptions = {
            debugMode: true
        };

    viewmodel.Timeline = viewmodel.Timeline || Timeline;

    function Timeline(o) {
        var that = this;
        that.opts = _.defaults(o || {}, defaultOptions);

        that.socket = new Socket({debugMode: that.opts.debugMode});

        that.socket.on('tweet/image', function (data, fn) {
            data.medias.forEach(function (media) {
                $('body').prepend($('<img src="' + media.media_url + ':small">'));
            });
        });
    }

}(jQuery, _, io, window.nakazawa.util));