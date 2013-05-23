var app = angular.module('employee', []).factory("db", function($rootScope) {
	//var db = {};
	var conn = openDatabase("MyDatabase", '1.0', 'My Test Database', 65536);
	//$rootScope.employee = {};
	showRecords =function(transaction, result) {
		console.log("show records..");
		$rootScope.tableData = [];
		for (var i = 0; i < result.rows.length; i++) {
			$rootScope.tableData.push(result.rows.item(i));
		}

	};
	createTable = function() {
		console.log(conn);
		conn.createSql = "CREATE TABLE IF NOT EXISTS aman(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,empid TEXT, email TEXT)";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.createSql);
		});

	};

	insertTable = function(name, empid, email) {
		console.log("here..");
		console.log(name);
		conn.insertSql = "INSERT INTO aman(name,empid,email) VALUES (?,?,?)";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.insertSql, [name, empid, email], showRecords);
			get();
		});

	};
	editContact = function(id) {
		//	$scope.employee = $scope.tableData[i];
		console.log("edit here..");

	}
	updateContact = function(currentId, name, empid, email) {
		console.log("updated record.");
		conn.updateSql = "UPDATE aman SET name = ?, empid= ?, email=? WHERE id=?";
		conn.transaction(function(transaction) {
			console.log(name, empid, email);
			transaction.executeSql(conn.updateSql, [name, empid, email, currentId]);
		});

	};

	get = function() {
		console.log("show");
		conn.fetchRecords = "SELECT * from aman";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.fetchRecords, [], showRecords);
		});
	};
	deleteRecord = function(row) {
		console.log(row);
		conn.deleteSql = "DELETE FROM aman where id=?";
		conn.transaction(function(transaction) {
			transaction.executeSql(conn.deleteSql, [row]);
			alert('Delete Sucessfully');

		});

	}
});
app.controller('EmpCtrl', function($scope, db, $rootScope) {
	$scope.name = '';
	$scope.email = '';
	$scope.empid = '';

	createTable();

	$scope.insertTable = function() {
		insertTable($scope.name, $scope.empid, $scope.email);
	};
	$scope.deleteRecord = function(row) {
		deleteRecord(row);
	};
	$scope.editContact = function(id) {
		for (var i in $rootScope.tableData) {
			if ($rootScope.tableData[i].id == id) {
				$scope.currentId = id;
				console.log($rootScope);
				$scope.name = $rootScope.tableData[i].name;
				$scope.empid = $rootScope.tableData[i].empid;
				$scope.email = $rootScope.tableData[i].email;
			}
		}
	};
	$scope.updateContact = function(id) {
		updateContact($scope.currentId, $scope.name, $scope.empid, $scope.email);
	};
	/*
	 $scope.get = function() {
	 get();
	 };*/

});
/*http://gabordemooij.com/jsoop.html*/
//groups.google.com/forum/?fromgroups=#!topic/angular/WQbQKBNv_qw
/*;www.php-ease.com/classes/sqlite.html*/