var myApp = angular.module('app', []);

    myApp.controller('MainCtrl', function ($scope) {
        $scope.greeting = 'Hello AngularJS!';
        $scope.messages = [];
        $scope.addMessage = function (m) {
            $scope.messages.unshift(m);
            $scope.message = '';
        }
    });