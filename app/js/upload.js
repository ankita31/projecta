var directives = {

  upload: function ($compile) {

    return {
      restrict: 'E',
      link: function (scope, element, attr) {
        scope.url = element.attr('url');
        element.html($compile(template)(scope));
      }
    };

  }

};
var controllers = {
	 UploadCtrl: function ($scope) {

    $scope.images = [];
    $scope.files = [];

    $scope.upload = function (element) {
    	
      $scope.$apply(function ($scope) {
        $scope.files = element.files;
      });
    };

    $scope.$watch('files', function () {

      for (var i = 0; i < $scope.files.length; i += 1) {

        var current = $scope.files[i];
        var reader = new FileReader();

        reader.onload = (function (file) {
          return function (env) {
            console.log(file.name);
            $scope.images.push({ name: file.name, src: env.target.result });
          }
        }(current));

        reader.readAsDataURL(current);
      }

    }, true);
    }};