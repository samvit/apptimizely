
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/view-hierarchy', function (req, res) {
  var data = req.params
  console.log(req.body);
  res.send("ok");
});

var sio = io.listen(server);

server.listen(8000);

sio.configure(function () { 
  sio.set("transports", ["xhr-polling"]); 
  sio.set("polling duration", 10); 
});

sio.configure(function (){
    sio.set('log level', 3);
    sio.set('authorization', function (handshakeData, callback) {
      callback(null, true); // error first callback style
    });
});

//socket connection
sio.sockets.on('connection', function (client) {

	client.emit('onConnected', { 'status': 'OK' } );
	console.log(' connected. '); //Useful to know when someone connects

    //They send messages here, and we send them to the server to handle.
	client.on('message', function(m) {
	    console.log(m);
	}); //client.on message

	client.on('updateScreen', function (data) {
		client.broadcast.emit('screenUpdated', data);
		console.log(data);
	});

	client.on('updateElements', function (data) {
	    client.broadcast.emit('updateElements', data);
	    console.log(data);
	});

  client.on('navigationClick', function (data){
      client.broadcast.emit('navigationClick', data);
      console.log(data);
  });

	console.log("sio is now configured to poll every 10 ms");

}); //sockets onconnection

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
