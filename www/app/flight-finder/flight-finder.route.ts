/// <reference path="../../../typings/main.d.ts"/>

module app.flightfinder {
	'use strict';

	angular.module('app.flightfinder')
		.config(flightFinderRouting);

	flightFinderRouting.$inject = ['$stateProvider'];
	function flightFinderRouting(stateProvider: angular.ui.IStateProvider): void {
		stateProvider.state('app.flightfinder', {
			url: '/flightfinder',
			views: {
				'container': {
					templateUrl: 'app/flight-finder/flight-finder.html',
					controller: 'app.flightfinder.FlightFinderController',
					controllerAs: 'vm',
				}
			}
		});
    }
}
