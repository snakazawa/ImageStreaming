(function (_, io, util) {
    'use strict';

    var model = util.namespace('ImageStreaming.model'),
        defaultOptions = {
            debugMode: true
        };

    model.Socket = model.Socket || Socket;

    function Socket(o) {
        var that = io.connect();
        that.opts = _.defaults(o || {}, defaultOptions);

        if (that.opts.debugMode) {
            initSocketDebugMode(that);
        }

        return that;
    }

    function initSocketDebugMode (socket) {
        var onKeys = ['connect'];

        // debug on event
        onKeys.forEach(function (key) {
            socket.on(key, function(res) {
                console.log('on: ' + key, res);
            });
        });

        // debug on emit
        (function (f) {
            socket.emit = function (key, req, fn) {
                var callback = function (res) {
                    console.log('callback: ' + key, res);
                    if (fn) {
                        fn.apply(this, arguments);
                    }
                };

                console.log('emit: ' + key, req);

                f.call(socket, key, req, callback);
            };
        }(socket.emit));
    }

}(_, io, window.nakazawa.util));