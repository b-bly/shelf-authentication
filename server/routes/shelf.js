var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.post('/', function(req, res){
    console.log('hit shelf post route', req.body);
    if (req.isAuthenticated()){
        console.log('authenticated user');
    } else {
        res.sendStatus(403);
    };
});

module.exports = router;