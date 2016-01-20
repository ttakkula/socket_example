var express = require('express')();
var http = require('http').Server(express);

//Create server socket
var io = require('socket.io')(http);

//Listen "connection" message from client socket
io.on('connection', function(socket){
    console.log('a user connected!');
    //Listen "chat msg" message from ANY client
    socket.on('chat msg',function(data){
        //Broadcast message to all connected clients
        io.emit('new message',data);
    })
});

express.get('/', function(req, res){
  res.sendfile('index.html');
});

express.get('/chat_scripts.js', function(req, res){
  res.sendfile('chat_scripts.js');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});