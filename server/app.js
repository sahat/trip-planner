var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var compression = require('compression');
var routes = require('./routes/index');
var users = require('./routes/users');
var sc = require('./sc');

var supercharger = require('./controllers/supercharger');

//var Supercharger = new mongoose.Schema({
//  state: String,
//  slots: Number,
//  maxRate: String,
//  date: Date,
//  location: String,
//  address: String,
//  notes: String
//});



var app = express();

app.set('port', process.env.PORT || 5000);
app.use(compression());
app.use(favicon(__dirname + '/../public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/supercharger', supercharger.getSuperchargerList);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port', app.get('port'));
});