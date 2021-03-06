/**
 * A flexible, generic modal service
 * @version v0.1.5
 * @link 
 * @author One Acre Fund <devs@oneacrefund.org>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (angular) {
'use strict';

angular.module('ngGenericModal', ['ui.bootstrap'])
	.controller('genericModalController', ['$scope', '$uibModalInstance', '$uibModalStack', GenericModalController])
	.factory('genericModal', ['$uibModal', '$q', '$templateCache', GenericModalFactory])
	.run(['$templateCache', function($templateCache) {
		$templateCache.put('modal.html',
		    "<div class='modal-header modal-border'>" +
		        "<h3 class='modal-title' id='modal-title'>" +
		            "<span ng-if='instance.options.icon'><i class='fa fa-{{instance.options.icon}} {{instance.options.iconClasses}}'></i> </span>" +
		            "{{instance.modalTitle}}" +
		        "</h3>" +
		    "</div>" +
		    "<div class='modal-body' id='modal-body'>" +
		        "<div ng-if='!instance.options.htmlBody && !instance.options.__isHtmlFile'>" +
		            "{{instance.modalBody}}" +
		        "</div>" +
		        "<ng-bind-html ng-if='instance.options.htmlBody && !instance.options.__isHtmlFile' ng-bind-html='instance.modalBody | to_trusted'></ng-bind-html>" +
		        "<ng-include ng-if='instance.options.__isHtmlFile' src='instance.modalBody'></ng-include>" +
		    "</div>" +
		    "<div class='modal-footer'>" +
		        "<button ng-if='instance.options.showContinue' class='btn btn-modal {{instance.options.continueClasses}}' type='button' ng-click='continue()'>{{instance.options.continueButton}}</button>" +
		        "<button ng-if='instance.options.showCancel' class='btn btn-modal {{instance.options.cancelClasses}}' type='button' ng-click='cancel()'>{{instance.options.cancelButton}}</button>" +
		    "</div>"
		);
	}])
	.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

function GenericModalController($scope, $uibModalInstance, $uibModalStack) {

    $scope.instance = $uibModalInstance;

    $scope.continue = function() {
        $uibModalInstance.close();
        $uibModalInstance.options.continueCallback($uibModalInstance);
        $uibModalStack.dismissAll();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss();
        $uibModalInstance.options.cancelCallback($uibModalInstance);
        $uibModalStack.dismissAll();
    };
}

function GenericModalFactory($uibModal, $q, $templateCache) {

	var tpl = $templateCache.get('modal.html');
	
	function open(title, body, options) {

	    // default values of optional parameters
	    // override these using the 'options' object
	    var defaultOptions = {
	        showContinue: true,				// show the continue button?
	        showCancel: false,				// show the cancel button?
	        cancellableBackdrop: true,		// allow the modal to be closed by clicking the backdrop?
	        continueButton: 'OK',			// text to show in the continue button
	        cancelButton: 'Cancel',			// text to show in the cancel button
	        continueClasses: '',			// additional html classes to add to the continue button
	        cancelClasses: '',				// additional html classes to add to the cancel button
	        htmlBody: false,				// if true, renders the 'body' text as html
	        size: 'md',						// sets the modal width (`sm`, `md`, or `lg`)
	        errorIcon: false,				// if true, displays an error icon in the header
	        successIcon: false,				// if true, displays a success icon in the header
	        icon: undefined,				// displays an icon in the header (overriden if errorIcon or successIcon = true)
	        iconClasses: undefined,			// additional classes to put on the header icon (overriden if errorIcon or successIcon = true)
	        continueCallback: function(){}, // callback to call when the continue button is pressed
	        cancelCallback: function(){},	// callback to call when the cancel button is pressed
	    };

	    options = Object.assign({}, defaultOptions, options);

	    if (options.errorIcon) {
	        options.icon = 'times-circle';
	        options.iconClasses = 'text-danger';
	    }
	    if (options.successIcon) {
	        options.icon = 'check-circle';
	        options.iconClasses = 'text-success';
	    }

	    options.__isHtmlFile = body.endsWith('.html') || body.endsWith('.cshtml');

	    var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        template: $templateCache.get('modal.html'),
	        controller: 'genericModalController',
	        controllerAs: 'modal',
	        size: options.size,
	        backdrop: options.cancellableBackdrop ? true : 'static',
	    });

	    modalInstance.modalTitle = title;
	    modalInstance.modalBody = body;
	    modalInstance.options = options;
	};

	function openPromise(title, body, options) {
	    options = options || {};
	    var deferred = $q.defer();
	    options.continueCallback = function() {
	        deferred.resolve();
	    }
	    options.cancelCallback = function() {
	        deferred.reject();
	    }
	    open(title, body, options);
	    return deferred.promise;
	};

	return {
	    open: open,
        openPromise: openPromise,
	};
}
})(angular);