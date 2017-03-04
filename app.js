const KEY = "nTalk.sid"
const SECRET = "nTalk"
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var load = require('express-load');
var expressSession = require('express-session')
var app = express();
var server = require('http').Server(app)
var io = require("socket.io")(server)
var cookie = cookieParser(SECRET);
var store = new expressSession.MemoryStore();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie);
app.use(expressSession({
	secret: SECRET,
	name: KEY,
	resave: true,
	saveUninitialized: true,
	store: store

}))
app.use(express.static(path.join(__dirname, 'public')));

io.use(function(socket,	next)	{
	console.log("sessao de usuario")
	var	data	=	socket.request;
	cookie(data,	{},	function(err)	{
		var	sessionID	=	data.signedCookies[KEY];
		store.get(sessionID,	function(err,	session)	{
			if	(err	||	!session)	{
					return	next(new	Error('acesso	negado'));
			}	else	{
					socket.handshake.session	=	session;
					return	next();
			}
		});
	});
});


load('models')
.then('controllers')
.then('routes')
.into(app)

load('sockets')
.into(io);

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

server.listen("5000", function(){
	console.log("socket io rodando")
})

app.listen("3030", function(){
	console.log("nTalk rodando")
})

module.exports = app;
