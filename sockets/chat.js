module.exports = function(io){
	var	sockets	=	io.sockets;
	console.log("conexão sockets iniciada")

	sockets.on('connection', function(client){
	var session = client.handshake.session 
	
	var usuario = session.usuario
		client.on('send-server', function(msg){
			console.log("recebendo uma mensagen no server")
			var msg = "<b>"+usuario.nome+":</b> "+msg+"</br>"
			client.emit('send-client', msg);
			client.broadcast.emit('send-client', msg);
		})
	})
}