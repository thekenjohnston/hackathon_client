/// <reference path="../../typings/main.d.ts"/>

module app {
  'use strict';

  var requiredModules:string[] = [
    'ionic',
    'ngCordova',
    'ngCordovaOauth',
    //'app.core.settings',
    'app.core.beacon',
    'app.core.notification',
    'app.home',
    'app.register',
    'app.flightfinder',
    'app.offers'
  ];

  angular.module('app', requiredModules);
}
