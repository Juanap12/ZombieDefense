var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
serv.listen(2000);
console.log("Server started.");

var io = require('socket.io')(serv,{});
var csocket = undefined;
io.sockets.on('connection', function(socket){
    console.log('socket connection');
    csocket = socket;
});

var five = require("johnny-five"),
    board, botton, potentiometer;
board = new five.Board();

board.on("ready", function() {
  button = new five.Button(2);
  potentiometer = new five.Sensor({
    pin: "A0",
    freq: 250
  });

   this.repl.inject({
     pot: potentiometer,
     button: button
   });

   potentiometer.on("data", function() {
      var pot = this;
      if (csocket != undefined)
        csocket.emit('serverMsg',{
           msg: pot.value,
      });
  });

   button.on("down", function() {
     console.log("ON");
     if(csocket != undefined)
      csocket.emit('serverMsg',{
        msg: "on",
      });
   });

});
