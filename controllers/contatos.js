module.exports = function(app){
	var Usuario = app.models.usuario
	
	var ContatosController = {
		index: function(req, res){

			var _id = req.session.usuario._id;
			Usuario.findById(_id).populate('contatos').exec(function(erro, usuario){
				Usuario.find({ _id: { $ne: req.session.usuario._id } }, function(err, usuarios) {
				  if (err) throw err;

					var contatos = usuario.contatos
					var params = {contatos: contatos, usuarios: usuarios, usuario: req.session.usuario._id}
					res.json(params)
					
				  // object of all the users
				});
			})
			

		}, 

		adiciona: function(req, res){
			console.log(req.params.id)
			var contatoId = req.params.id
			var _id = req.session.usuario._id
			Usuario.findById(_id, function(erro, usuario){
				var contatos = usuario.contatos;
				contatos.push(contatoId);
				usuario.save(function(){
					res.json(contatos)
				})
			})
		},


		create: function(req, res){
			var _id = req.session.usuario._id
			Usuario.findById(_id, function(erro, usuario){
				var contato = req.body.contato
				var contatos = usuario.contatos;
				contatos.push(contato);
				usuario.save(function(){
					res.redirect("/contatos")
				})
			})
		},
		show:	function(req,	res)	{
			var	contatoId	= req.params.id
			
				console.log(req.params.id)
			Usuario.findById(contatoId, function(erro, contato){
				var resultado =	{contato: contato};
				
				res.json(resultado);		
			})
		},
		edit: function(req,	res)	{
			var _id = req.session.usuario._id

			Usuario.findById(_id, function(erro, usuario){
				var	contatoId	= req.params.id
				, contato =	usuario.contatos.id(contatoId)
				, resultado =	{contato: contato};
				
				res.render('contatos/edit',	resultado);
			})
		},
		update:	function(req,	res)	{
			var _id = req.session.usuario._id 
			Usuario.findById(_id, function(erro, usuario){
				var contatoId = req.params.id
				var contato = usuario.contatos.id(contatoId)
				contato.nome = req.body.contato.nome;
				contato.email = req.body.contato.email;
				usuario.save(function(){
					res.redirect('/contatos')
				})
			})
		},
		destroy: function(req,	res)	{
			var _id = req.session.usuario._id
			Usuario.findById(_id, function(erro, usuario){
				var contatoId = req.params.id
				usuario.contatos.id(contatoId).remove()
				usuario.save(function(){
					res.json(usuario)
				})
			})
		}


	}

	return ContatosController
}