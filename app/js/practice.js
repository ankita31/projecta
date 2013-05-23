function FormCtrl($scope,$filter) {
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    
    $scope.limit = 3;
    $scope.currentPage = 0;
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.gender = 'Male';
	
	$scope.value = [];
	
	$scope.shortName = 'MyDatabase';
	$scope.version = '1.0';
	$scope.displayName = 'My Test Database Example';
	$scope.maxSizeInBytes = 65536;
	$scope.db = openDatabase($scope.shortName, $scope.version,
			$scope.displayName, $scope.maxSizeInBytes);

	$scope.insertRecords = function() {
		$scope.createTableIfNotExists();
		
		$scope.insertsql = 'INSERT INTO Contacts (firstName, lastName, gender, image) VALUES (?, ?, ?,  ?)';
		if ($scope.contactForm.$valid) {
			$scope.db.transaction(function(transaction) {
				transaction.executeSql($scope.insertsql, [ $scope.firstName,
						$scope.lastName, $scope.gender, hobbies, document.getElementById('uploadImg').src ],
						window.location.reload());
			});
		}
	};

	$scope.createTableIfNotExists = function() {
		$scope.createsql = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, gender TEXT, image TEXT)";
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.createsql, []);
		});
	};

	$scope.dropTable = function() {
		$scope.dropsql = "DROP TABLE Contacts";
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.dropsql, [], window.location.reload());
		});
	};

	$scope.getContacts = function() {
		$scope.fetchRecords = "SELECT * from Contacts";
		$scope.db
				.transaction(function(transaction) {
					transaction.executeSql($scope.fetchRecords, [],
							$scope.showRecords);
				});
	};
	$scope.getContacts();
	$scope.showRecords = function(transaction, result) {
		$scope.tableData = [];
		for ( var i = 0; i < result.rows.length; i++) {
			$scope.tableData.push(result.rows.item(i));
		}
	};

	$scope.editContact = function(id) {
		for ( var i in $scope.tableData) {
			if ($scope.tableData[i].id == id) {
				$scope.currentId = id;
				$scope.firstName = $scope.tableData[i].firstName;
				$scope.lastName = $scope.tableData[i].lastName;
				$scope.gender = $scope.tableData[i].gender;
				$scope.imageSrc = $scope.tableData[i].image;
				
			}
		}
	};

	$scope.updateContact = function() {
		
		$scope.updateStatement = "UPDATE Contacts SET firstName = ?, lastName = ?, gender = ?,  image=? WHERE id=?";
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.updateStatement,
					[ $scope.firstName, $scope.lastName, $scope.gender,
							 document.getElementById('uploadImg').src, $scope.currentId ], window.location.reload());
		});
	};

	$scope.deleteContact = function(id) {
		$scope.deleteStatement = "DELETE FROM Contacts where id=" + id;
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.deleteStatement, [], window.location.reload());
		});
	};
	
	
	}
	
	