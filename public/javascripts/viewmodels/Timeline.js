(function ($, _, io, util) {
    'use strict';

    var viewmodel = util.namespace('ImageStreaming.viewmodel'),
        model = util.namespace('ImageStreaming.model'),
        Socket = model.Socket,
        defaultOptions = {
            debugMode: true,
            masonrySelector: '#timeline',
            masonryOptions: {
                itemSelector: '.item'
            }
        };

    viewmodel.Timeline = viewmodel.Timeline || Timeline;

    function Timeline(o) {
        var that = this;
        that.opts = _.defaults(o || {}, defaultOptions);

        that.$masonry = $(that.opts.masonrySelector).masonry(that.opts.masonryOptions);

        that.socket = new Socket({debugMode: that.opts.debugMode});

        that.socket.on('tweet/image', function (data, fn) {
            data.medias.forEach(function (media) {
                var $item = $('<img src="' + media.media_url + ':small">');
                $item.addClass('item');

                that.$masonry
                    .prepend($item)
                    .masonry('prepended', $item[0])
            });
        });
    }

}(jQuery, _, io, window.nakazawa.util));