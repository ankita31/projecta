var app = angular.module('contactPath', []).config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		templateUrl : 'partials/save.html',
		controller : 'AddCtrl'
	}).when('/display/:id', {
		templateUrl : 'partials/display.html',
		controller : 'ViewCtrl'
	}).when('/editemp/:id', {
		templateUrl : 'partials/editemp.html',
		controller : 'EditCtrl'
	}).otherwise({
		redirectTo : '/'
	});
	//$locationProvider.hashPrefix('');
	// $locationProvider.html5Mode(true);
}]).factory("db", function($rootScope) {
	var db = {};
	var conn = openDatabase("MyDatabase", '1.0', 'My Test Database', 65536);
	//$rootScope.employee = {};
	showRecords = function(transaction, result) {
		console.log("show records..");
		$rootScope.tableData = [];
		for (var i = 0; i < result.rows.length; i++) {
			$rootScope.tableData.push(result.rows.item(i));
		}

	};

	createTable = function() {
		console.log(conn);
		conn.createSql = "CREATE TABLE IF NOT EXISTS admin(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,phone TEXT, email TEXT)";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.createSql);
		});

	};

	insertTable = function(name, phone, email) {
		console.log("here..");
		console.log(name);

		conn.insertSql = "INSERT INTO admin(name,phone,email) VALUES (?,?,?)";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.insertSql, [name, phone, email], window.location.reload(), showRecords);
			get();
		});

	};
	get = function() {
		console.log("show table...");
		conn.fetchRecords = "SELECT * from admin";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.fetchRecords, [], showRecords);

		});

	};
	deleteRecord = function(row) {
		console.log(row);
		conn.deleteSql = "DELETE FROM admin where id=?";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.deleteSql, [row], window.location.reload(), showRecords);
			alert('Delete Sucessfully');
			get();
		});
     
	}
	editContact = function(id) {

		//	$scope.employee = $scope.tableData[i];
		console.log("edit.");

	}
	updateContact = function(currentId, name, phone, email) {
		console.log("updated record.");
		conn.updateSql = "UPDATE admin SET name = ?, phone= ?, email=? WHERE id=?";
		conn.transaction(function(transaction) {
			console.log(name, phone, email);
			transaction.executeSql(conn.updateSql, [name, phone, email, currentId]);

		});

	};

});
app.controller('AddCtrl', function($scope, db, $rootScope, $location, $routeParams) {

	console.log($routeParams.id);
	
	get();
	createTable();

	$scope.name = '';
	$scope.email = '';
	$scope.phone = '';
	$scope.currentId = $routeParams.id;
	$scope.insertTable = function() {
		$scope.save = true;
		$scope.edit = false;
		console.log("insert");
		insertTable($scope.name, $scope.phone, $scope.email);
	};
});

app.controller('ViewCtrl', function($scope, db, $rootScope, $location, $routeParams) {
   
	$scope.id = $routeParams.id;
	for (var i in $rootScope.tableData) {
		console.log($rootScope.tableData);

		if ($rootScope.tableData[i].id == $scope.id) {
			$scope.currentId = $scope.id;
			$scope.name = $rootScope.tableData[i].name;
			$scope.phone = $rootScope.tableData[i].phone;
			$scope.email = $rootScope.tableData[i].email;
		}

	}

	$scope.editContact = function(id) {
		$location.path('/editemp/' + $scope.id);
			};

});

app.controller('EditCtrl', function($scope, db, $rootScope, $location, $routeParams) {

	$scope.editContact = function(id) {
		$location.path('/editemp/' + $scope.id);
		$scope.id = $routeParams.id;

		for (var i in $rootScope.tableData) {
			console.log($rootScope.tableData);

			if ($rootScope.tableData[i].id == $scope.id) {
				$scope.currentId = $scope.id;
				$scope.name = $rootScope.tableData[i].name;
				$scope.phone = $rootScope.tableData[i].phone;
				$scope.email = $rootScope.tableData[i].email;
			}

		}

	};

	$scope.editContact();

	$scope.updateContact = function(id) {

		updateContact($scope.currentId, $scope.name, $scope.phone, $scope.email);
		$location.path('/' + $scope.id);
	};

	console.log($rootScope.tableData);

	$scope.deleteRecord = function(row) {
			deleteRecord(row);
		$location.path('/');
	};
});
