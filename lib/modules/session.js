var session = require('express-session');
var mongo = require('connect-mongo');
var config = require('config');

module.exports = session({
    name: config.get('session.name'),
    secret: config.get('session.secret'),
    store: new (mongo(session))(config.get('mongo')),
    resave: true,
    saveUninitialized: false
});