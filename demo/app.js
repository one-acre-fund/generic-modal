(function(angular) {
'use strict';

	angular
		.module('myApp', ['ngGenericModal'])
		.controller('MainController', ['$scope', 'genericModal', MainController]);

	function MainController($scope, genericModal) {
		// console.log(genericModal);
		genericModal.open('hi', 'test');
		// console.log(genericModal);
		// console.log(genericModal.open);
	}

})(angular);