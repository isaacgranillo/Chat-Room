var express = require('express');
var app = express();
app.use(express.static(__dirname+'/static'));
var PORT = process.env.PORT || 1337;
var server = app.listen(PORT);
var io = require('socket.io').listen(server);
var users = [];

io.sockets.on('connection', function(socket){
	console.log("Socket Connected");

	socket.on('newUser', function(data){
		users.push({ name: data.name, socket_id: socket.id 
		})
	io.emit('updateUserList', users);	
	});

	socket.on('disconnect', function(){
		console.log("Socket Disconnected");
		for(index in users){
			if (users[index].socket_id == socket.id){
				users.splice(index, 1);
				io.emit('updateUserList', users)
				break;
			}
		}
	})

	socket.on('newMessage', function(data){
		for (index in users) {
			if(users[index].socket_id == socket.id) {
				users[index].name
				data.message
				io.emit('addMessage', { name: users[index].name, message: data.message })
				break;
			}
		}
	})


});
