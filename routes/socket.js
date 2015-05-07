var socketio = require('socket.io');
var _ = require('lodash');
var async = require('async');
var sessionMiddleware = require('../lib/modules/session');

var TwitWrap = require('../lib/models/twitter/TwitWrap');
var ImageStream = require('../lib/models/twitter/ImageStream');

module.exports = function (server) {
    var io = socketio.listen(server);
    var users = {}; // 接続しているユーザ情報
    var sockets = {}; // ソケット群 (key: username)
    var twit = new TwitWrap();

    io.use(function (socket, next) {
        sessionMiddleware(socket.request, {}, next);
    });

    // 接続時
    io.sockets.on('connection', function (socket) {
        console.log('new connected: ' + socket.id);

        var user = {
            info: !socket.request.session ? null :
                !socket.request.session.passport ? null :
                    socket.request.session.passport.user
        };

        users[socket.id] = user;

        // ログインしていなかったら接続を切る
        if (!checkAuth(socket, function (message) { socket.disconnect(message); })) {
            return;
        }

        var imageStreaming =  new ImageStream(twit, 'statuses/filter', { track: 'flower' });
        imageStreaming.on('tweet/image', function (tweet, medias, retweetFrom) {
            console.log(socket.id.substr(1, 2));
            socket.emit('tweet/image', {medias: medias});
        });

        // 切断
        socket.on('disconnect', function () {
            console.log('disconnected: ' + socket.id);
            delete users[socket.id];
            imageStreaming.stop();
            imageStreaming = null;
        });
    });

    /**** helper *****/

    function serverErrorWrap(err, otherParam, fn) {
        console.error(err);
        fn(_.extend({
            status: 'server error',
            message: err.message
        }, otherParam || {}));
    }

    function userErrorWrap(message, otherParam, fn) {
        fn(_.extend({
            status: 'error',
            message: message
        }, otherParam || {}));
    }

    function successWrap(message, otherParam, fn) {
        fn(_.extend({
            status: 'success',
            message: message
        }, otherParam || {}));
    }

    // passport チェック
    function checkAuth(socket, fn) {
        var user = users[socket.id];

        if (!user) {
            serverErrorWrap(new Error('undefined user'), {}, fn);
            return false;
        }

        if (!user.info) {
            userErrorWrap('must be login', {}, fn);
            return false;
        }

        return true;
    }
};