
  "use strict";

angular.module("navbarapp", ["controllers"])
  .directive("navbar", function() {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    templateUrl: "navbar.html",
    compile: function(element, attrs) {
      var li, liElements, links, index, length;

      liElements = $(element).find("#navigation-tabs li");
      for (index = 0, length = liElements.length; index < length; index++) {
        li = liElements[index];
        links = $(li).find("a");
        if (links[0].textContent === attrs.currentTab) $(li).addClass("active");
      }
    }
  }});
;

var controllers = angular.module("controllers", []);

controllers.controller("HomePageCtrl", function HomePageCtrlHomePageCtrl($scope) {
  $scope.pageName = "Home Page";
});

controllers.controller("SecondPageCtrl", function SecondPageCtrl($scope) {
  $scope.pageName = "Second Page";
});

controllers.controller("ThirdPageCtrl", function ThirdPageCtrl($scope) {
  $scope.pageName = "Third Page";
});
angular.module('navbarapp')
  .controller('MainCtrl', function($scope, $http) {
    var url = "http://feeds.feedburner.com/NDTV-Cricket";

    $http.jsonp(url).
      success(function(data, status, headers, config) {
        $scope.feed = {
          title: 'DailyJS',
          items: data.query.results.entry
        };
      }).
      error(function(data, status, headers, config) {
        console.error('Error fetching feed:', data);
      });
  });
  /*http://dailyjs.com/2013/04/25/angularjs-3/*/
/*https://github.com/alexyoung/djsreader/blob/73af5543e323c9faef37ff2e4c158231f8374512/app/index.html*/
