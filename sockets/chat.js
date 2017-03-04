module.exports = function(io){
	var	sockets	=	io.sockets;
	console.log("conexão sockets iniciada")
	var crypto = require("crypto")
	sockets.on('connection', function(client){
	var session = client.handshake.session 
	
	var usuario = session.usuario
		client.on('send-server', function(msg){
			console.log("recebendo uma mensagen no server")
			var sala = session.sala
			var data = {email: usuario.email, sala: sala}
			var msg = "<b>"+usuario.nome+":</b> "+msg+"</br>"

			client.broadcast.emit('new-message', data)
			client.emit('send-client', msg)
			client.in(sala).emit('send-client', msg);
		})

		client.on("join", function(sala){
			if (!sala) {
				var timestamp = new Date().toString()
				var md5 = crypto.createHash('md5')
				sala = md5.update(timestamp).digest('hex')

			}

			session.sala = sala
			client.join(sala)
		})

		client.on('disconnect', function(){
			client.leave(session.sala)
		})
	})


}