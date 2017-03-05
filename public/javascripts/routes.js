angular.module("ntalk").config(function($routeProvider) {
	
	$routeProvider.when("/",{
		templateUrl: 'partials/contatos/index.ejs',
		controller: 'ContatosController'
	})

	$routeProvider.when("/contato/:id/show",{
		templateUrl: 'partials/contatos/show.ejs',
		controller: 'ShowContatoController'
	})
	
	$routeProvider.when("/contato/:id/editar",{
		templateUrl: 'partials/contatos/edit.ejs',
		controller: 'EditContatoController'
	})


	$routeProvider.otherwise("/")
})