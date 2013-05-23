var app = angular.module('contactPath', []).config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		templateUrl : 'partials/practemplate.html',
		controller : 'AddCtrl'
	}).when('/save', {
		templateUrl : 'partials/save.html',
		controller : 'AddCtrl'
	}).when('/editemp', {
		templateUrl : 'partials/editemp.html',
		controller : 'AddCtrl'
	}).when('/display', {
		templateUrl : 'partials/display.html',
		controller : 'AddCtrl'
	}).otherwise({
		redirectTo : '/'
	});
	// $locationProvider.hashPrefix('');
	// $locationProvider.html5Mode(true);
}])

/*
 function($routeProvider) {
 $routeProvider.when('#/', {
 controller : 'AddCtrl',
 templateUrl : 'practemplate.html'
 }).when('save.html', {
 controller : 'AddCtrl',
 templateUrl : 'partials/save.html'
 });
 */.factory("db", function($rootScope) {
	//var db = {};
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
		conn.createSql = "CREATE TABLE IF NOT EXISTS emp(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,phone TEXT, email TEXT)";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.createSql);
		});

	};

	insertTable = function(name, phone, email) {
		console.log("here..");
		console.log(name);

		conn.insertSql = "INSERT INTO emp(name,phone,email) VALUES (?,?,?)";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.insertSql, [name, phone, email], showRecords);
			get();
		});

	};
	get = function() {
		console.log("show table...");
		conn.fetchRecords = "SELECT * from emp";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.fetchRecords, [], showRecords);

		});

	};
	deleteRecord = function(row) {
		console.log(row);
		conn.deleteSql = "DELETE FROM emp where id=?";
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
		conn.updateSql = "UPDATE emp SET name = ?, phone= ?, email=? WHERE id=?";
		conn.transaction(function(transaction) {
			console.log(name, phone, email);
			transaction.executeSql(conn.updateSql, [name, phone, email, currentId]);

		});

	};

});
app.controller('AddCtrl', function($scope, db, $rootScope, $location, $routeParams) {

	console.log("in here");
	createTable();
	get();
	$scope.name = '';
	$scope.email = '';
	$scope.phone = '';
	$scope.insertTable = function() {
		$scope.save = true;
		$scope.edit = false;
		console.log("insert");
		insertTable($scope.name, $scope.phone, $scope.email);
	};
	$scope.editContact = function(id) {
		$location.path('/editemp');
		console.log("edit here..");
		for (var i in $rootScope.tableData) {
			if ($rootScope.tableData[i].id == id) {
				$scope.currentId = id;
				console.log($rootScope);
				$scope.name = $rootScope.tableData[i].name;
				$scope.phone = $rootScope.tableData[i].phone;
				$scope.email = $rootScope.tableData[i].email;
			}
		}

	};
	$scope.updateContact = function(id) {
		updateContact($scope.currentId, $scope.name, $scope.phone, $scope.email);
	};

	$scope.deleteRecord = function(row) {
		deleteRecord(row);
		console.log("deleted");

	};

});
/*http://www.raweng.com/blog/2013/01/30/introduction-to-angularjs-part-1/*/
	
