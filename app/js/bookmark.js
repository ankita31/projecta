angular.module('BookMark.service', []).factory('Rest', function () {
    return ('api/bookmark/:id', {}, {
        query:  {method: 'GET', isArray: true},
        get:    {method: 'GET'},
        remove: {method: 'DELETE'},
        edit:   {method: 'PUT'},
        add:    {method: 'POST'}
    });
});

angular.module('BookMark', ['BookMark.service']).config(function ($httpProvider) {
    $httpProvider.defaults.transformRequest = function (data) {
        var str = [];
        for (var p in data) {
            data[p] !== undefined && str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
        }
        return str.join('&');
    };
    $httpProvider.defaults.headers.put['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded; charset=UTF-8';
});

angular.module('BookMark').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/add1',      {templateUrl: 'partials/add1.html',  controller: BookMarkCtrl})
                  .when('/edit2/:id', {templateUrl: 'partials/edit2.html', controller: BookMarkCtrl})
                  .when('/',         {templateUrl: 'partials/list.html', controller: BookMarkCtrl});
}]);

var BookMarkCtrl = function ($scope, $routeParams, $location, Rest) {
    if ($routeParams.id) {
        $scope.bookmark = Rest.get({id: $routeParams.id});
    }
    if ($location.path() === '/') {
        $scope.bookmarks = Rest.query();
    }

    $scope.add = function () {
        Rest.add({}, $scope.newBookMark, function (data) {
            $location.path('/');
        });
    };

    $scope.delete = function (id) {
        if (!confirm('Confirm delete')) {
            return;
        }

        Rest.remove({id: id}, {}, function (data) {
            $location.path('/');
        });
    };

    $scope.save = function () {
        Rest.edit({id: $scope.bookmark.id}, $scope.bookmark, function (data) {
            $location.path('/');
        });
    };
};