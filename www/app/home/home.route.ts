/// <reference path="../../../typings/main.d.ts"/>

module app.home {
	'use strict';

	angular.module('app.home')
		.config(homeRouting);

	homeRouting.$inject = ['$stateProvider'];
	function homeRouting(stateProvider: angular.ui.IStateProvider): void {
		stateProvider.state('app.home', {
			url: '/home',
			views: {
				'container': {
					templateUrl: 'app/home/home.html',
					controller: 'app.home.HomeController',
					controllerAs: 'vm',
				}
			}
		});
    }
}
