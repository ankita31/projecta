angular.module('contactPath', ['contactPath.services']).
    config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl:'partials/save.html', controller:AddCtrl})
    
    $routeProvider.otherwise({redirectTo:'/'});
}]);
var AddCtrl = function ($rootScope, $location, createTable,db) {
	createTable.get();
    $scope.insertIntoTable = function() {
    	console("insert here..");
		insertTable.get($scope.id, $scope.name, $scope.phone, $scope.email);
	}
};
