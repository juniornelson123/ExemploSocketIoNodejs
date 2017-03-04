module.exports = function(app){
	var index = app.controllers.index
	app.get('/', index.index);
	app.post('/entrar', index.login);
	app.get('/sair', index.logout);
}