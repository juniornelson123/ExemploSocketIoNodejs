module.exports = function(app){
	var IndexController = {
		index: function(req,res){
			res.render('home/index', {title: "Bem vindo"})
		},

		login: function(req, res){
			console.log(req.body)
			var email = req.body.usuario.email
			var nome = req.body.usuario.nome

			if (email && nome) {
				var usuario = req.body.usuario;
				usuario['contatos'] = []
				req.session.usuario = usuario;
				res.redirect('/contatos')
			}else{
				res.redirect('/')
			}
		},

		logout: function(req, res){
			req.session.destroy()
			res.redirect('/')	
		}
	}

	return IndexController
}