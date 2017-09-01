var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user.js');


router.get('/', function (req, res) {

    if (req.isAuthenticated()) {
        console.log('hit userList get route');
        User.find({}, function (err, data) {
            if (err) {
                console.log('find error', err);
                res.sendStatus(500);
            } else {
                res.send(data);
                console.log(data);
            };
        });
    } else {
        res.sendStatus(403);
    };
});


module.exports = router;