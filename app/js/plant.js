angular.module('plantsapp', []).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
          when('/plants', { templateUrl: 'partials/plants.html', controller: PlantsController }).
          when('/plants/:Id', { templateUrl: 'partials/plant.html', controller: PlantController }).
          otherwise({ redirectTo: '/plants' });
  }]);