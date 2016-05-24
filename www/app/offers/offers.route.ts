/// <reference path="../../../typings/main.d.ts"/>

module app.offers {
  'use strict';

  angular.module('app.offers')
    .config(registerRouting);

  registerRouting.$inject = ['$stateProvider'];
  function registerRouting($stateProvider:angular.ui.IStateProvider):void {
    $stateProvider.state('app.offers', {
      url: '/offers',
      views: {
        'container': {
          templateUrl: 'app/offers/offers.html',
          controller: 'app.offers.OffersController',
          controllerAs: 'vm'
        }
      }
    });
  }
}
