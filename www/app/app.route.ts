/// <reference path="../../typings/main.d.ts"/>

module app {
	'use strict';

	angular.module('app')
		.config(routing);

	routing.$inject = ['$urlRouterProvider', '$stateProvider'];
	function routing(
			$urlRouterProvider: ng.ui.IUrlRouterProvider,
			$stateProvider: ng.ui.IStateProvider): void {

		$stateProvider
			.state('app', {
				abstract: true,
				url: '/app',
				templateUrl: 'app/core/layout/template.html',
				controller: 'app.AppController'
			});

		$urlRouterProvider.otherwise('/app/home');
	}
}

