'use strict';

/* App Module */
/*
angular.module('phonecat', ['phonecatFilters']).

  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/phones'});
}]);
*/


angular.module('userApp', ["ngResource"]).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {templateUrl: 'partials/login.html',   controller: LoginCtrl}).
        when('/loggedin', {templateUrl: 'partials/user-admin.html', controller: UserCtrl}).
        otherwise({redirectTo: '/login'});
}],[ '$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode = true;
}]).

factory("User", function($resource) {
    return $resource("users/:user.json", {}, {
        query: {method: "GET", params: {userId: "users"}, isArray: true}
    });
});