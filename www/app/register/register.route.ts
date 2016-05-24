/// <reference path="../../../typings/main.d.ts"/>

module app.register {
	'use strict';

	angular.module('app.register')
		.config(registerRouting);

	registerRouting.$inject = ['$stateProvider'];
	function registerRouting($stateProvider: angular.ui.IStateProvider): void {
		$stateProvider.state('app.register', {
			url: '/register',
			views: {
				'container': {
					templateUrl: 'app/register/register.html',
					controller: 'app.register.RegisterController',
					controllerAs: 'vm',
				}
			}
		});
    }
}
