var app = angular.module('employee', [])
.factory("db", function($rootScope) {
	// $rootScope.employee = {};
	// var db = {
	// //db: null,
	// open : function(shortName, displayName) {
	// console.log("in here");
	// $rootScope.db = openDatabase("MyDatabase", '1.0', 'My Test Database', 65536);
	// }
	// };
	$rootScope.db = openDatabase("MyDatabase", '1.0', 'My Test Database', 65536);
	$rootScope.showRecords = function(transaction, result) {

		$rootScope.tableData = [];
		for (var i = 0; i < result.rows.length; i++) {
			$rootScope.tableData.push(result.rows.item(i));
		}

	};
	

	// db.open('MyDatabase', 'My Test Database Example');
	//return obj;
});


app.factory('createTable', function($rootScope) {
	var data = {
		get : function() {

			$rootScope.createStatement = "CREATE TABLE IF NOT EXISTS ank(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,empid TEXT, email TEXT,image TEXT)";
			$rootScope.db.transaction(function(transaction) {
				
				transaction.executeSql($rootScope.createStatement, []);
			});
		}
	}

	return data;
});
app.factory('insertTable', function($rootScope) {
	var data = {
		get : function(id,name, empid, email,image) {
			$rootScope.insertStatement = "INSERT INTO ank(name,empid,email,image) VALUES ( ?,?,?,?)";
			$rootScope.db.transaction(function(transaction) {
				//console.log(name,empid,email);
				transaction.executeSql($rootScope.insertStatement, [name, empid, email,image],window.location.reload());
			});
		}
	}
	return data;
      $location.path('/');
});
app.factory('getContacts', function($rootScope) {
	var data = {
		get : function() {
			console.log("show");
			//console.log($rootScope.tableData);
			$rootScope.fetchRecords = "SELECT * from ank";
			$rootScope.db.transaction(function(transaction) {
				transaction.executeSql($rootScope.fetchRecords, [], $rootScope.showRecords);
			});
		}
	};
	return data;

});

app.factory('deleteRecords', function($rootScope) {
	var data = {
		get : function(row) {
			console.log("delete");
			$rootScope.deleteStatement = "DELETE FROM ank where id=?";
			$rootScope.db.transaction(function(transaction) {
				transaction.executeSql($rootScope.deleteStatement, [row], window.location.reload());
				alert('Delete Sucessfully');
			});
		}
	};
	return data;
});
app.factory('editContact',function($rootScope) {
	//	$scope.employee = $scope.tableData[i];
		var data = {
		get : function(id) {
			console.log("edit here");
		for (var i in $rootScope.tableData) {
			 if ($rootScope.tableData[i].id == id) {
				 $rootScope.currentId = id;
				$rootScope.name = $rootScope.tableData[i].name;
				 $rootScope.empid = $rootScope.tableData[i].empid;
				 $rootScope.email = $rootScope.tableData[i].email;
				 $rootScope.imageSrc = $rootScope.tableData[i].image;
			 }
		};
		}
	};
	return data;
	});
app.factory('updateContact',function($rootScope) {
var data = {
		get : function(currentId,name, empid, email,image) {
			console.log("updated record.");
		$rootScope.updateStatement = "UPDATE ank SET name = ?, empid= ?, email=?,image=? WHERE id=?";
		$rootScope.db.transaction(function(transaction) {
			 console.log(name,empid,email);
			transaction.executeSql($rootScope.updateStatement, [name, empid,email,image,currentId], window.location.reload());
		});
		}
	};
return data;
});

 app.factory('dropTable',function($rootScope) {
 var data={
 get:function(){
 $rootScope.dropsql = "DROP TABLE ank";
 $rootScope.db.transaction(function(transaction) {
 transaction.executeSql($rootScope.dropsql, [], window.location.reload());
 });
 }
 };
 return data;
 });

app.controller('EmpCtrl', function($scope, createTable, insertTable, deleteRecords,updateContact,editContact, dropTable,getContacts, db, $rootScope) {
	// call service like this

	createTable.get();
	$scope.insertIntoTable = function() {
		insertTable.get($scope.id, $scope.name, $scope.empid, $scope.email,document.getElementById('uploadImg').src);
	};
	$scope.showIntoTable = function() {
		getContacts.get();
	};
	
	 $scope.editIntoTable=function(row){
	 editContact.get(row);
	 };
	 $scope.dropIntoTable=function(row){
	 dropTable.get();
	 };
	$scope.delIntoRow = function(row) {
		deleteRecords.get(row);

	};
    $scope.updateTable = function(id) {
		updateContact.get($scope.currentId, $scope.name, $scope.empid, $scope.email);

	};
});

