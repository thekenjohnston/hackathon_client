/// <reference path="../../../../typings/main.d.ts"/>
module app.core.settings {
    'use strict';

  angular.module('app.core.settings')
    .config(registerRouting);

  registerRouting.$inject = ['$stateProvider'];
  function registerRouting($stateProvider:angular.ui.IStateProvider):void {
    $stateProvider.state('app.settings', {
      url: '/settings',
      views: {
        'container': {
          templateUrl: 'app/core/settings/settings.html',
          controller: 'app.core.settings.SettingsController',
          controllerAs: 'vm'
        }
      }
    });
  }
}
