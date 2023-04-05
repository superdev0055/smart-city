var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var feedbacks = require('./routes/feedbacks');
var incidents = require('./routes/incidents');
var alerts = require('./routes/show_alerts_with_delgation');
var User = require('./api/user');
var Incident = require('./api/incident');
var Delegation = require('./api/delegation');
var note = require('./routes/note');

var app = express();
const cors = require('cors')
const morgan = require('morgan')



var mongoose = require('mongoose');
mongoose.connect('mongodb://ismail:ismail@ds155699.mlab.com:55699/pistack');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

//var Feedback = require("./models/feedback");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/', feedbacks);
app.use('/alerts', alerts);

app.use('/incidents', incidents);
app.use('/index', index);
app.use('/users', users);
app.use('/user', User);
app.use('/note', note);
app.use('/incident', Incident);
app.use('/delegation', Delegation);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
