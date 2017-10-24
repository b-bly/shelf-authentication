var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Item = require('../models/item.schema.js');

//comes from info.controller
//this route will add the item that was put on the shelf by the current user
router.post('/', function (req, res) {
    console.log('hit shelf post route', req.body);
    if (req.isAuthenticated()) {
        console.log('authenticated user');
        var itemToSave = new Item(req.body);
        itemToSave.placer = req.user.username;
        itemToSave.save(function (err, data) { 
            if (err) { 
                console.log('error saving item:', err);
                res.sendStatus(500);
            } else { 
                res.sendStatus(201);
            }
        });
    } else { 
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

router.delete('/:id', function (req, res) {

    if (req.isAuthenticated()) { // is the user logged in?

        var itemToDelete = {};

        console.log('req.params.id', req.params.id);
        

        Item.findById(req.params.id, function(err, data){
            if (err){
                console.log('delete find error:', err);
                res.sendStatus(500);
            } else {
                console.log('no result');
                console.log('data:', data);
                
                itemToDelete = data;
            } 
            console.log('Current user:', req.user.username);
            console.log('User who placed item:',itemToDelete.placer);
            
            if (req.user.username === itemToDelete.placer){ // is the user the same one who added it?
                Item.findByIdAndRemove({ _id: req.params.id }, function (err) {
                    if (err) {
                        console.log('delete error', err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    };
                });
            } else {
                res.sendStatus(500);
            }
        });
        
        
    }
});


module.exports = router;