var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Item = require('../models/item.schema.js');

//comes from info.controller
//this route will add the item that was put on the shelf by the current user
router.post('/', function (req, res) {
    console.log('hit shelf post route', req.body);
    //this will make sure that the user adding the item IS authenticated
    if (req.isAuthenticated()) {
        console.log('authenticated user');
        //the user is active and signed in so the item is saved and added to the DB
        //adding to the object the name of user who placed item on shelf with .placer
        var itemToSave = new Item(req.body);
        //adding to the object the name of user who placed the item on shelf using .placer
        itemToSave.placer = req.user.username;
        itemToSave.save(function (err, data) { //checking to make sure that the item was added to DB
            if (err) { //item did not get added to the DB
                console.log('error saving item:', err);
                res.sendStatus(500);
            } else { //item successfull added to DB
                res.sendStatus(201);
            }
        });
    } else { //user not authenticated
        res.sendStatus(403);
    };
});

//gets all documents from 'items' collection
router.get('/', function (req, res) {
    console.log('hit shelf get route');
    Item.find({}, function (err, data) {
        if (err) {
            console.log('find error', err);
            res.sendStatus(500);
        } else {
            res.send(data);
            console.log(data);
        };
    });
});

router.delete('/:id', function (req, res){
    Item.findByIdAndRemove({_id: req.params.id}, function(err){
        if (err) {
            console.log('delete error', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        };
    });
});


module.exports = router;