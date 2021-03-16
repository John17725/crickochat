var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var message = [{
	id:1,
	text: "Welcome to CrickoChat",
	author:"CrickosoGames"
}];

app.use(express.static('../crickochat')) /*Especifica ruta del index.html*/

app.get('/',function(req,res){
	res.status(200).send("Welcome to my page")
});

io.on('connection',function(socket){
	console.log('Anyone join to chat');
	socket.emit('message',message);
	socket.on('new-message',function(data){
		message.push(data);
		io.sockets.emit('message',message);
	})
});

server.listen(8080, function() {
	console.log('Server running to: localhost:8080');
})