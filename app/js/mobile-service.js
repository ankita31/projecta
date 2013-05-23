 
angular.module('mobileServices', ['ngResource']). // new service mobileServices depending on ngResource
    factory('Task', function($resource) { // declaring a MyTable resource
        return $resource('https://myservice.azure-mobile.net/tables/task/:taskId', {taskId: '@id'}, // binding to the table url
            {
                'update': { method:'PATCH' } // adding an update function
            }
        );
    });