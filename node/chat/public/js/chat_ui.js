function divEscapedContentElement (message) {
	return $('<div></div>').text(message)
}
function divSystemContentElement(message) {
	return $('<div></div>').html('<li>' + message + '</li>')
}

function processUserInput(chatApp, socket) {
	var message = $('#send-message').val()
	console.log(message)
	var systemMessage
	if (message.charAt(0) == '/') {
		systemMessage = chatApp.processCommand(message)
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage))
		}
	} else {
		console.log($('#room').text())
		console.log(message)
		chatApp.sendMessage($('#room').text(), message)
		$('#messages').append(divEscapedContentElement(message))
		$('#messages').scrollTop($('#messages').prop('scrollHeight'))
	}
	$('#send-message').val('')
}

var socket = io.connect()

$(document).ready(function() {
	var chatApp = new Chat(socket)

	socket.on('nameResult', function(result) {
		var message
		if (result.success) {
			message = '你的新名字是 ' + result.name
		} else {
			message = result.message
		}
		$('#messages').append(divSystemContentElement(message))
	})

	socket.on('joinResult', function(result) {
		$('#room').text(result.room)
		$('#messages').append(divSystemContentElement('Room changed.'))
	})
	socket.on('message', function(message) {
		var newElement = $('<div></div>').text(message.text)
		$('#messages').append(newElement)
	})
	$('#send-message').focus()
	$('#send-button').click(function(e) {
		processUserInput(chatApp, socket)
	})
	$('#join').click(function(){ 
		chatApp.changeRoom('wang')
	})
})











