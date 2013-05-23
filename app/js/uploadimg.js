		    function FormCtrl($scope){
			 $scope.imageLoader = document.getElementById('$scope.imageLoader');
			$scope.imageLoader.addEventListener('change', handleImage, true);
			/*
			var canvas = document.getElementById('imageCanvas');
						var ctx = canvas.getContext('2d');*/
			
			

			function handleImage(e) {
				$scope.reader = new FileReader();
				$scope.reader.onload = function(event) {
					//console.log(event.target.result);
//					$("#imageLoader").data("imagedata", event.target.result);
					
					$(" $scope.imageLoader").attr('data-src','');
					$(" $scope.imageLoader").attr('data-src',event.target.result);
					document.getElementById('previewImage').src = event.target.result;
					// var img = new Image();
					// img.onload = function() {
						// canvas.width = img.width;
						// canvas.height = img.height;
						// ctx.drawImage(img, 0, 0);
					// }
					// img.src = event.target.result;
					$("$scope.imageData").val(event.target.result);
				}
				$scope.reader.readAsDataURL(e.target.files[0]);
			}
			}
//http://www.proglogic.com/learn/javascript/lesson10.php
