function FormCtrl($scope) {
	 $scope.limit = 3;
	$scope.name = '';
	$scope.empid = '';
	$scope.email = '';
	$scope.age = '';
	$scope.gender = '';
	$scope.salary = '';
	$scope.joiningdate = '';
	$scope.shortName = 'MyDatabase';
	$scope.version = '1.0';
	$scope.displayName = 'My Test Database Example';
	$scope.maxSizeInBytes = 65536;
	$scope.db = openDatabase($scope.shortName, $scope.version, $scope.displayName, $scope.maxSizeInBytes);

	//$scope.employee = {}; // will hold the form data

	$scope.insertRecords = function() {
		
		
	//	db.insertRecord('ankita', $scope.employee);
				
				$scope.createTableIfNotExists();
				$scope.insertsql = 'INSERT INTO ankita (name,empid,email,age ,gender,salary,joiningdate,image) VALUES (?, ?,?,?,?,?,?,?)';
				//	if ($scope.contactForm.$valid) {
				console.log($scope.insertsql);
				
				db.insertRecord([$scope.name, $scope.empid, $scope.email, $scope.age, $scope.gender, $scope.salary, $scope.joiningdate, document.getElementById('uploadImg').src]);
				$scope.db.transaction(function(transaction) {
					console.log('insert here...');
					transaction.executeSql($scope.insertsql, [$scope.name, $scope.empid, $scope.email, $scope.age, $scope.gender, $scope.salary, $scope.joiningdate, document.getElementById('uploadImg').src], window.location.reload());
				});
		
		
	};

	$scope.createTableIfNotExists = function() {
		$scope.createsql = "CREATE TABLE IF NOT EXISTS ankita(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, empid TEXT, email TEXT, age TEXT, gender TEXT , salary TEXT, joiningdate TEXT,image TEXT)";
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.createsql, []);
		});
	};

	$scope.editContact = function(id) {
	//	$scope.employee = $scope.tableData[i];
		
		for (var i in $scope.tableData) {
			 if ($scope.tableData[i].id == id) {
				 $scope.currentId = id;
				$scope.name = $scope.tableData[i].name;
				 $scope.empid = $scope.tableData[i].empid;
				 $scope.email = $scope.tableData[i].email;
				 $scope.age = $scope.tableData[i].age;
			     $scope.gender = $scope.tableData[i].gender;
				 $scope.salary = $scope.tableData[i].salary;
				 $scope.joiningdate = $scope.tableData[i].joiningdate;
				 $scope.imageSrc = $scope.tableData[i].image;
 
			 }
		 }
	};

	$scope.updateContact = function() {

		$scope.updateStatement = "UPDATE ankita SET name = ?, empid = ?, email=?,age=?,gender = ?, salary=? , joiningdate=?,image=? WHERE id=?";
		$scope.db.transaction(function(transaction) {
			
			transaction.executeSql($scope.updateStatement, [$scope.name, $scope.empid, $scope.email, $scope.age, $scope.gender, $scope.salary, $scope.joiningdate, document.getElementById('uploadImg').src, $scope.currentId], window.location.reload());
		});
	};

	$scope.deleteRecord = function(id) {
		$scope.deleteStatement = "DELETE FROM ankita where id=" + id;
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.deleteStatement, [], window.location.reload());
			alert('Delete Sucessfully');
		});
	};

	$scope.dropTable = function() {
		$scope.dropsql = "DROP TABLE ankita";
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.dropsql, [], window.location.reload());
		});
	};

	$scope.getContacts = function() {
		$scope.fetchRecords = "SELECT * from ankita";
		$scope.db.transaction(function(transaction) {
			transaction.executeSql($scope.fetchRecords, [], $scope.showRecords);
		});
	};
	$scope.getContacts();
	$scope.showRecords = function(transaction, result) {

		$scope.tableData = [];
		for (var i = 0; i < result.rows.length; i++) {
			$scope.tableData.push(result.rows.item(i));
		}
	};

}

