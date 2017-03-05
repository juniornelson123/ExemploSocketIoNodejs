module.exports = function(io){
	var	sockets	=	io.sockets;
	var redis = require('redis').createClient()
	console.log("conexão sockets iniciada")
	var crypto = require("crypto")
	var onlines = {}
	

	sockets.on('connection', function(client){
		
		var session = client.handshake.session 
		var usuario = session.usuario
		
		//onlines[usuario.email] = usuario.email
		redis.sadd('onlines', usuario.email, function(erro){
			redis.smembers('onlines', function(erro, emails){
				emails.forEach(function(email){
					console.log("onlines"+email)
					client.emit("notify-onlines", email)
					client.broadcast.emit("notify-onlines", email)
				})
			})
		})


		client.on('send-server', function(msg, dest){
			console.log("recebendo uma mensagen no server")
			console.log(dest)
			console.log(usuario._id)
			var sala = session.sala
			var data = {email: usuario.email, sala: sala}
			var msg = "<b>"+usuario.nome+":</b> "+msg+"</br>"
			redis.lpush(sala, msg)
			client.broadcast.emit('new-message', data, dest, usuario._id)
		
			client.emit('send-client', msg)
			client.in(sala).emit('send-client', msg);
		})

		client.on("join", function(sala){
			console.log("criando sala")
			if (!sala) {
				
				var timestamp = new Date().toString()
				var md5 = crypto.createHash('md5')
				sala = md5.update(timestamp).digest('hex')

			}

			session.sala = sala
			client.join(sala)

			var msg = "<b>"+usuario.nome+":</b>entrou<br>"
			redis.lpush(sala, msg, function(erro, res){
				redis.lrange(sala, 0, -1, function(erro, msgs){
					msgs.forEach(function(msg){
						sockets.in(sala).emit("send-client", msg)
					})
				})
			})
		})

		client.on('disconnect', function(){
			var	sala = session.sala
			var msg	= "<b>"+ usuario.nome +":</b> saiu.<br>";
			
			redis.lpush(sala, msg)
			client.broadcast.emit('notify-offlines', usuario.email);
			sockets.in(sala).emit('send-client', msg);
			redis.srem('onlines', usuario.email)
			
			client.leave(session.sala)

		})
	})


}