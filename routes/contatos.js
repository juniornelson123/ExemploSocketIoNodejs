var autenticar = require("./../middlewares/autenticador")
module.exports = function(app){
	var contatos = app.controllers.contatos 
	app.get("/contatos",autenticar,contatos.index)
	app.get("/contato/:id",autenticar, contatos.show)
	app.post("/contato",autenticar, contatos.create)
	app.get("/contato/:id/editar",autenticar, contatos.edit)
	app.post("/contato/:id",autenticar, contatos.update)
	app.post("/contato/:id/destroy",autenticar, contatos.destroy)
	app.get("/adiciona-contato/:id", autenticar, contatos.adiciona)
}