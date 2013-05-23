'use strict';

var foodMeApp = angular.module('MyApp', ['ngResource']);

foodMeApp.config(function($routeProvider) {

  $routeProvider.
      when('/', {
        controller: 'apppractice',
        templateUrl: 'practice1.html'
      }).
      });