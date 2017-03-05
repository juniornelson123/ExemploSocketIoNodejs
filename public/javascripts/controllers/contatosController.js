angular.module("ntalk").controller('ContatosController', function($scope, $resource){
	var Contatos = $resource("/contatos")

	var carregarContatos = function(){
		Contatos.get(function(data){
			$scope.usuarios = data.usuarios
			$scope.usaurio = data.usuario
			$scope.contatos = data.contatos
		}, function(erro){
			console.log(erro)
		})
	}

	carregarContatos()
})