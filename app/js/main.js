'use strict';

angular.module('djsreaderApp')
  .controller('MainCtrl', function($scope, $http) {
    var url = "http://feeds.feedburner.com/ndtv/Lsgd";

    $http.jsonp(url).
      success(function(data, status, headers, config) {
        $scope.feed = {
          title: 'DailyJS',
          items: data.query.results.entry
        };
      }).
      error(function(data, status, headers, config) {
      	console.log(status);
        console.error('Error fetching feed:', data);
      });
  });