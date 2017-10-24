var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var passport = require('./strategies/userStrategy');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var shelf = require('./routes/shelf');
var userList = require('./routes/userList');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/** Routes **/
app.use('/register', register);
app.use('/user', user);
app.use('/shelf', shelf);
app.use('/userList', userList);


// handles redirect from passport login failure
app.use('/loginFailure', function(req, res) {
    res.sendStatus(403);
});

// handles login/registration post request
app.use('/', index);

/** Mongo Connection **/
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/passport';
}

mongoose.connect(mongoURI, { useMongoClient: true });

mongoose.connection.on('error', function(err){
   if(err) {
     console.log("MONGO ERROR: ", err);
   }
   res.sendStatus(500);
});

mongoose.connection.once('open', function(){
   console.log("Connected to Mongo, meow!");
});

// App Set //
app.set('port', (process.env.PORT || 5000));

/** Listen **/
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
