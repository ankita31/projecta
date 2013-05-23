function PlantsController($scope, $http) {
    $http.get('http://localhost:8001/plants').success(function (data) {
        $scope.plants = data;
    });
}
 
function PlantController($scope, $routeParams, $http) {
    $http.get('http://localhost:8001/plants/' + $routeParams.Id).success(function (data) {
        $scope.plant = data;
    });
}