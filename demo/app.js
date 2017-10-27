(function(angular) {
'use strict';

	angular
		.module('myApp', ['ngGenericModal'])
		.controller('MainController', ['$scope', 'genericModal', MainController]);

	function MainController($scope, genericModal) {
		
		$scope.defaultOpen = function() {
			genericModal.open('Default modal', 'The most basic usage of the generic modal.');
		};

		$scope.openWithOptions = function() {
			genericModal.open('Open with options',
					'<p>This is an example of a modal that was opened with some options specified.</p><ul>' 
					+ '<li>The body text is rendered as HTML</li>'
					+ '<li>The "cancel" button is turned on</li>'
					+ '<li>The backdrop is made uncancellable</li>'
					+ '<li>The success icon is shown</li>'
					+ '<li>Callbacks are defined for the continue and cancel buttons</li></ul>', {
				htmlBody: true,
				showCancel: true,
				continueButton: 'OK (with callback)',
				cancelButton: 'Cancel (with callback)',
				cancellableBackdrop: false,
				successIcon: true,
				continueCallback: function() { alert('You pressed continue'); },
				cancelCallback: function() { alert('You pressed cancel'); },
			});
		};

		$scope.openWithTemplate = function() {
			genericModal.open('Open with template', './template-example.html', {

			});
		};
	}

})(angular);