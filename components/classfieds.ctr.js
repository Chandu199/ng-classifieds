(function(){
	"use strict";
	angular.module("ngClassifieds")
	.controller("classifiedsCtrl",function($scope,$http,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog){
		classifiedsFactory.getClassifieds().then(function(classifieds){
			$scope.classifieds = classifieds.data;
			
		});
		var contact  = {
			"name": "Chandrakanth",
			"phone": "(555)555-555",
			"email": "ck@example.com"
		}

		$scope.categories = getCategories($scope.classifieds);

		$scope.openSidebar =  function() {
			$mdSidenav('left').open();
		}

		$scope.closeSidebar =  function(){
			$mdSidenav('left').close(); 
		}
		$scope.saveClassified = function(classified){
			if(classified){
				classified.contact =  contact;
				$scope.classifieds.push(classified);
				$scope.classified= {};
				$scope.closeSidebar();
				showToast("Classified Saved")
			}
		}
		$scope.editClassified =  function(editClassified){
			$scope.editing = true;
			$scope.openSidebar();
			$scope.classified =  editClassified;
		}

		$scope.saveEdit = function(){
			$scope.editing = false;
			$scope.classified = {};
			$scope.closeSidebar();
			showToast("Edited Successfully")

		}
		$scope.deleteClassified =  function(event,classified){
			var confirm = $mdDialog.confirm()
					.title("Are you sure you want to delete" + classified.title)
					.ok('Yes')
					.cancel('NO')
					.targetEvent(event);

			$mdDialog.show(confirm).then(function(){
				var index = $scope.classifieds.indexOf(classified);

				$scope.classifieds.splice(index,1);

			},function(){

			});
			
		}
		function getCategories(classifieds){
			var categories = [];
			angular.forEach(classifieds,function(item){
				 angular.forEach(item.categories,function(category){
				 	categories.push(category);
				 });
			});
			return _.uniq(categories);
		}

		function showToast(){
			$mdToast.show(
					$mdToast.simple()
						.content(message)
						.position('top','right')
						.hideDelay(3000)
					);
		}

	});
})();