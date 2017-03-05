angular.module("ntalk").controller('EditContatoController', function($scope, $routeParams, $location, $resource){
	var Contato = $resource("/contato/"+$routeParams.id)	
	var detalheContato = function(){
		Contato.get(function(contato){
			$scope.contato = contato.contato
			
		}, function(erro){
			console.log(erro)
		})
	}

	$scope.remove = function(){
			console.log("ok")
		$resource("/contato/"+$routeParams.id+"/destroy").get(function(data){
			$location.path("/#!")
		}, function(erro){
			console.log(erro)
		})
	}
	detalheContato();
})