 
angular.module('myapp', ['mobileServices']). // setting up our app to use the mobileServices service
    config(['$httpProvider', function($httpProvider) { // coniguring the httpProvider
        $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'myapplicationkey'; // add the application key
        $httpProvider.defaults.headers.common['Content-Type'] = 'Application/json';
    }]);