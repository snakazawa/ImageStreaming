var express = require('express');
var router = express.Router();
var config = require('config');

/* GET home page. */
router.get('/', function (req, res) {
    var mustLogin = req.params.mustLogin === '1';
    var logined = req.isAuthenticated && req.isAuthenticated();

    res.render('index', {
        title: config.get('title'),
        mustLogin: mustLogin,
        logined: logined,
        user: req.user
    });
});

router.get('/timeline', function (req, res) {
    var logined = req.isAuthenticated && req.isAuthenticated();

    if (!logined) {
        res.redirect('/?mustlogin=1');
    } else {
        res.render('timeline', {
            title: 'Timeline' + ' | ' + config.get('title'),
            user: req.user
        });
    }
});

module.exports = router;