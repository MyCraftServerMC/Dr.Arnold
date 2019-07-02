var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const dotenv = require('dotenv').config();
var port = process.env.PORT || 80;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(port, function(){
  console.log('listening on port:'+port);
});

io.on('connection', function(socket){
  console.log('connected');

  socket.on('disconnect', function(){
    console.log('disconnected');
  });
});
