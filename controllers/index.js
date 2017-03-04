module.exports = function(app){
	var Usuario = app.models.usuario

	var IndexController = {
		index: function(req,res){
			res.render('home/index', {title: "Bem vindo"})
		},

		login: function(req, res){
			var query = {email: req.body.usuario.email}

			Usuario.findOne(query)
				.select('nome email')
				.exec(function(erro, usuario){
					if (usuario) {
						console.log("Usuario existe "+usuario)
						req.session.usuario = usuario;
						res.redirect('/contatos')		
					}else{
						var usuario =req.body.usuario
						Usuario.create(usuario, function(erro, usuario){
							if (erro) {
								res.redirect("/")
							}else{
								console.log("Criando usuario "+usuario)
								req.session.usuario = usuario
								res.redirect('/contatos')
							}
						})	
					}
				})	
		},

		logout: function(req, res){
			req.session.destroy()
			res.redirect('/')	
		}
	}

	return IndexController
}