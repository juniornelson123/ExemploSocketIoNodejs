angular.module("ntalk").controller('ShowContatoController', function($scope, $resource, $routeParams){
	var Contato = $resource("contato/"+$routeParams.id)
	var detalheContato = function(){
		$resource("contato/"+$routeParams.id).get(function(contato){
			console.log(contato.contato)
			$scope.contato = contato.contato
			
		}, function(erro){
			console.log(erro)
		})
	}

	detalheContato();	
})

