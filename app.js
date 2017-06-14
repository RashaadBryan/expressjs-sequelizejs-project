var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var sessions = require('express-sessions');
var hbs = require('express-handlebars');
var indexRoute = require('./routes/index');
var signUpRoute = require('./routes/signup');

app.engine('html', hbs({extname: 'html', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'html');


app.use('/cssFiles', express.static(__dirname + '/public/css'));
app.use('/jsFiles', express.static(__dirname + '/public/js'));


app.use('/', indexRoute);

app.use('/index', indexRoute);

app.use('/signup', signUpRoute);



app.listen(1337, function(){
	console.log('Listening at port 1337');
});