const socket = require('socket.io')
let io
let guestNumber = 1
let nickNames = {}
let nameUsed = []
let currentRoom = {}

function assignGuestName(socket, guestNumber, nickNames, nameUsed) {
	var name = 'Guest' + guestNumber
	nickNames[socket.id] = name
	socket.emit('nameResult', {
		success: true,
		name: name
	})
	nameUsed.push(name)
	return guestNumber + 1
}

function joinRoom(socket, room) {
	socket.join(room)
	currentRoom[socket.id] = room
	socket.emit('joinResult', {room})
	socket.broadcast.to(room).emit('message', {
		text: nickNames[socket.id] + ' has joined ' + room + '.'
	})

	// var usersInRoom = io.sockets.clients()
	// var clients_in_the_room = io.sockets.adapter.rooms[room]; 
	// console.log(clients_in_the_room)
	// console.log(socket.rooms)
}

function handleNameChangeAttempts(socket, nickNames, nameUsed) {
	socket.on('nameAttempt', function(name) {
		if (name.indexOf('Guest') == 0) {
			socket.emit('nameResult', {
				success: false,
				message: 'Names cannot begin width Guest'
			})
		} else {
			if (nameUsed.indexOf(name) == -1) {
				var previousName = nickNames[socket.id]
				var previousNameIndex = nameUsed.indexOf(previousName)
				nameUsed.push(name)
				nickNames[socket.id] = name
				delete nameUsed[previousNameIndex]
				socket.emit('nameResult', {
					success: true,
					name: name
				})
				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text: previousName + ' is now known as ' + name + '.'
				})
			} else {
				socket.emit('nameResult', {
					success: false,
					message: 'That name is already in use'
				})
			}
		}
	})
}

function handleMessageBroadcasting(socket, nickNames) {
	socket.on('message', function(message) {
		socket.broadcast.to(message.room).emit('message', {
			text: nickNames[socket.id] + ': ' + message.text
		})
	})
}
function handleRoomJoining(socket) {
	socket.on('join', function(room) {
		socket.leave(currentRoom[socket.id])
		joinRoom(socket, room.newRoom)
	})
}

function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = nameUsed.indexOf(nickNames[socket.id])
		delete nameUsed[nameIndex]
		delete nickNames[socket.id]
	})
}

exports.listen = function(server) {
	io = socket.listen(server)
	io.sockets.on('connection', function(socket) {
		console.log('链接成功')
		guestNumber = assignGuestName(socket, guestNumber, nickNames, nameUsed)
		joinRoom(socket, 'Lobby')
		handleMessageBroadcasting(socket, nickNames)
		handleNameChangeAttempts(socket, nickNames, nameUsed)
		handleRoomJoining(socket)
		handleClientDisconnection(socket)
	})
}