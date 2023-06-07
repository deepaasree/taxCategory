var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

app = express();

require('./swagger');
require('./config/config');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.use('/property', require('./controllers/property.controller').router);
app.use('/taxcategory', require('./controllers/taxCategories.controller').router);
// app.use('/taxzonemapping', require('./controllers/taxZonesMapping.controller').router);

const models = require('./models');

models.sequelize.authenticate().then(() => {
  console.log('Connected to Postgresql');
}).catch(err => {
  console.error('Unable to connect to Postgresql', err.message);
});
models.sequelize.sync({ alter: true });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
